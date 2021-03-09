import React, { useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import { StyleSheet, Text, View } from 'react-native';

import PublicRoute from './components/Authentication/PublicRoute'
import PrivateRoute from './components/Authentication/PrivateRoute'

import Home from './scenes/Home'
import Login from './scenes/Login'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const MainPage = ({
    isLoggedIn
}) => {
    return (
        <Router>
            <View style={styles.container}>
                <Switch>
                    <PublicRoute 
                        component={Home}
                        path="/"
                        isLoggedIn={isLoggedIn}
                        exact
                    />
                    <PublicRoute 
                        component={Login}
                        path="/login"
                    />
                    <PrivateRoute 
                        component={() => <Redirect to={"/"} />}
                        path="/"
                        isLoggedIn={isLoggedIn}
                    />
                </Switch>
            </View>
        </Router>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)