import { clone } from 'ramda'

const buildFilesFormData = files =>
  files.reduce((formData, file) => formData.append('file', file, file.name), new FormData())

const appJson = 'application/json'
const contType = 'Content-Type'

export default class Api {
    constructor(options = { baseUrl: 'api/', defaultOptions: {} }) {
        this.baseUrl = options.baseUrl
        this.defaultOptions = {
            credentials: 'same-origin',
            ...options.defaultOptions,
        }
        this.defaultOptions.headers = {
            Accept: appJson,
            'Content-Type': appJson,
            ...options.defaultOptions.headers,
        }
    }

    getUrl = originalUrl => `${this.baseUrl}${originalUrl}`

    fetch = (url, options) =>
        fetch(url, options)
            .then(this.parseBody)
            .then(this.checkStatus.bind(this, url, options))

    parseBody(response) {
        const contentType = response.headers.get(contType)
        let parsePromise
        if (/json/.test(contentType)) {
            parsePromise = response.json()
        } else if (/multipart/.test(contentType)) {
            parsePromise = response.formData()
        } else if (/pdf|xml/.test(contentType)) {
            parsePromise = response.blob()
        } else {
            parsePromise = response.text()
        }
        return parsePromise.then(parsedBody => ({ response, parsedBody }))
    }

    checkStatus(url, originalOptions, { response, parsedBody }) {
        if (response.ok) {
            switch (response.status) {
            case 204:
                return {
                ...response,
                requestBody: JSON.parse(originalOptions.body),
                }
            default:
                return parsedBody || {}
            }
        }
        switch (response.status) {
            case 401:
            case 403:
            default:
            throw {
                ...response,
                requestBody: JSON.parse(originalOptions.body),
                responseBody: { status: parsedBody.status },
            }
        }
    }

    genericRequest(method, originalUrl, options) {
        const url = this.getUrl(originalUrl)
        const opt = { ...clone(this.defaultOptions), ...options, method }
        opt.headers = { ...this.defaultOptions.headers, ...options.headers }
        if (options?.body instanceof FormData) {
            delete opt.headers[contType]
        }
        if (opt.headers[contType] === appJson) {
            // opt.body = JSON.stringify(opt.body, replacer)
            opt.body = JSON.stringify(opt.body)
        }
        return this.fetch(url, opt)
    }

    get = (originalUrl, options = {}) =>
    this.genericRequest('get', originalUrl, {
      ...options,
      headers: { ...options.headers, 'Content-Type': null },
    })

    post = (originalUrl, options = {}) => this.genericRequest('post', originalUrl, options)

    put = (originalUrl, options = {}) => this.genericRequest('put', originalUrl, options)

    patch = (originalUrl, options = {}) => this.genericRequest('PATCH', originalUrl, options)

    delete(originalUrl, options = {}) {
        options.headers = options.headers || {}
        options.headers.Accept = options.headers.Accept || '*'
        return this.genericRequest('delete', originalUrl, options)
    }

    uploadFiles = (url, files) => this.post(url, { body: buildFilesFormData(files) })
}