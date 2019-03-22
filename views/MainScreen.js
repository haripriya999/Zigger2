import React from 'react';
import {Alert, Platform, StyleSheet, Text, View, Image, Button, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class HomeScreen extends React.Component {

  static navigationOptions = () => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'black'
    },
  });
  
  render() {
    const {navigate} = this.props.navigation;
    const cuser = JSON.parse(JSON.stringify(this.props.navigation.getParam('user')));
    return (
      <LinearGradient
      colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
      start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 0.0}}
      style={styles.container}>

        <View style={styles.card}>

          <Text style={styles.show}>Email: {cuser[Object.keys(cuser)[0]].email}</Text>
          <Text style={styles.show}>Username: {cuser[Object.keys(cuser)[0]].username}</Text>
          <Text style={styles.show}>Phone No.: {cuser[Object.keys(cuser)[0]].phoneno}</Text>

          <View style={styles.btnContainer}>
            <Button
              title="Search for nearby donations"
              onPress={() => navigate('Donation', {user: cuser})}
            />
          </View>
          
        </View>

      </LinearGradient>
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
  card:{
   padding:30,
   marginTop:100,
   marginBottom:100,
   backgroundColor: '#DDDDDD',
   borderRadius:20,
   borderWidth: 3,
   borderColor: '#222222',
   flex: 1,
   alignItems: 'center',
   flexDirection: 'column',
   justifyContent: 'center',
  },
  show:{
   fontSize:20,
   color: '#222222',
   
  },
});
