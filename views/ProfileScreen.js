import React from 'react';
import {Alert, Platform, StyleSheet, Text, View, Image, Button, Linking } from 'react-native';
import Bananas from './utils/Bananas';

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.cuser = JSON.parse(JSON.stringify(this.props.navigation.getParam('user')));
  }

  render() {
    const cuser = this.cuser[Object.keys(this.cuser)[0]]
    return (
      <View style={styles.container}>

        <Text>{cuser.email}</Text>
        <Text>{cuser.username}</Text>
        <Text>{cuser.phoneno}</Text>
        
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  btnContainer: {
    margin: 20, 
    width: 200,
  },
});
