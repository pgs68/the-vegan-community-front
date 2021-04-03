
const changeFormInfo = (formObject, idAttr, value, changeFunction) => {
    changeFunction({
        ...formObject,
        [idAttr]: value
    })
}

export { changeFormInfo }