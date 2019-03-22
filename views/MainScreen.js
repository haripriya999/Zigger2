import React from 'react';
import {Alert, Platform, StyleSheet, Text, View, Image, Button, Linking } from 'react-native';
import Bananas from './utils/Bananas';

export default class HomeScreen extends React.Component {

  render() {
    const {navigate} = this.props.navigation;
    const cuser = JSON.parse(JSON.stringify(this.props.navigation.getParam('user')));
    return (
      <View style={styles.container}>

        <Text><Text style={styles.field}>Email:</Text> {cuser[Object.keys(cuser)[0]].email}</Text>
        <Text><Text style={styles.field}>Username:</Text> {cuser[Object.keys(cuser)[0]].username}</Text>
        <Text><Text style={styles.field}>Phone No.:</Text> {cuser[Object.keys(cuser)[0]].phoneno}</Text>

        <View style={styles.btnContainer}>
          <Button
            title="Search for nearby donations"
            onPress={() => navigate('Donation', {user: cuser})}
          />
        </View>
        
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
  field: {
    fontSize:20, 
    color: '#841584',
  },
  btnContainer: {
    margin: 20, 
    width: 200,
  },
});
