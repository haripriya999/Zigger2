import React from 'react';
import { Alert, Platform, StyleSheet, Text, View, Image, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class HomeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <LinearGradient
      colors={['#24c6dc', '#514a9d']}
      start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
      style={styles.container}>

        <Text style={styles.header1}>Welcome to Zigger!</Text>

        <View style={styles.btnContainer}>
          <Button
            title="Login"
            onPress={() => navigate('Login')}
          />
        </View>

        <Text style={styles.header1}>OR</Text>

        <View style={styles.btnContainer}>
          <Button
            title="SignUp"
            onPress={() => navigate('Signup')}
          />
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
  header1: {
    fontSize: 42,
    marginBottom: 40,
    color: '#EEEEEE',
  },
  or1: {
    fontSize: 28,
  },
  btnContainer: {
    padding: 20, 
    width: 200,
  },
});
