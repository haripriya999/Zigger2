import React from 'react';
import { Alert, Platform, StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase';
import ErrorMessage from '../utils/ErrorMessage';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this._onLogin = this._onLogin.bind(this);
    this.state = {email: "", password: "", errorMessage: "", disabled: false};
  }

  handleSignIn = () => {
    this.setState({disabled: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase.database().ref('transporters').orderByChild('email').equalTo(this.state.email).limitToFirst(1).once('value')
        .then(cuser => this.props.navigation.navigate('Main', {user: cuser}))
        .catch(error => this.setState({ errorMessage: error.message, disabled: false }));
      })
      .catch(error => this.setState({ errorMessage: error.message, disabled: false }));
  }

  _onLogin() {
    this.handleSignIn();
  }
  

  render() {
    return (

      <View style={styles.container}>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Email'
            onChangeText={(emaill) => this.setState({email: emaill})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={(passwordd) => this.setState({password: passwordd})}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button
            title="Login"
            disabled={this.state.disabled}
            onPress={this._onLogin}
          />
        </View>
        
        <ErrorMessage errorMessage={this.state.errorMessage} />

        <Text style={{padding: 10, fontSize: 20}}>
          Not registered yet? &nbsp;
          <Text style={{padding: 10, fontSize: 30, color: '#841584'}} onPress={() => this.props.navigation.navigate('Signup')}>Sign Up</Text>
        </Text>

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
  inputContainer: {
    margin: 4, 
    width: 300,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  btnContainer: {
    margin: 2,
    padding: 20, 
    width: 200,
  },
});

