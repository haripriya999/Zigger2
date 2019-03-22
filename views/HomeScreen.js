import React from 'react';
import { Alert, Platform, StyleSheet, Text, View, Image, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

        <Text style={styles.header1}>Welcome to Zigger!</Text>
        <Text style={styles.header1}>Transporter App</Text>

        <View style={styles.btnContainer}>
          <Button
            title="Login"
            onPress={() => navigate('Login')}
          />
        </View>

        <Text style={styles.or1}>OR</Text>

        <View style={styles.btnContainer}>
          <Button
            title="SignUp"
            onPress={() => navigate('Signup')}
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
  header1: {
    fontSize: 42,
    marginBottom: 40,
  },
  or1: {
    fontSize: 28,
  },
  btnContainer: {
    padding: 20, 
    width: 200,
  },
});
