import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import store from './src/store'
import MainPage from './src/MainPage'

import firebase from 'firebase/app'
require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyBFj4sZWvQV1Cz190Xay_1FtWtT7NshYnE",
  authDomain: "the-vegan-community-api.firebaseapp.com",
  databaseURL: "https://the-vegan-community-api-default-rtdb.firebaseio.com",
  projectId: "the-vegan-community-api",
  storageBucket: "the-vegan-community-api.appspot.com",
  messagingSenderId: "592696552624",
  appId: "1:592696552624:web:d5a12ab0144391b6295f75",
  measurementId: "G-F212EMJZTP"
}
firebase.initializeApp(firebaseConfig)

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <MainPage firebase={firebase}/>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
