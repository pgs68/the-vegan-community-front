import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { fetchProducts } from '../../actions/product'
import { Text } from 'react-native';

const Home = ({
    fetchProducts
}) => {
    useEffect(() => {
        fetchProducts()
    })
    return <Text>Esta es la página de home</Text>
}

//export default Home;
const mapStateToProps = state => ({
    productos: state. product.productos
})

const mapDispatchToProps = {
    fetchProducts
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeConnected
export { Home }

