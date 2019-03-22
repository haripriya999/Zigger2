import React from 'react';
import { Alert, Platform, StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase';
import ErrorMessage from '../utils/ErrorMessage';

export default class SignupScreen extends React.Component {

  constructor(props) {
    super(props);
    this._onSignup = this._onSignup.bind(this);
    this.state = {email: "", username: "", password: "", retypePassword: "", phoneno: "", errorMessage: "", disabled: false};
    /*
    firebase.database().ref('distributors').push({ email: 'distro2@gmail.com', username: 'distro2',
     latitude: 30.3850, longitude: 98.4867, phoneno: 987654321, foodUnits: 40, claimants: ['sandeep', 'sharat'], })
    .then(() => {})
    .catch(error => this.setState({ errorMessage: error.message }));
    */
}

  handleSignUp = () => {
    if(this.state.username === '' || this.state.phoneno === '' || this.state.password != this.state.retypePassword) {
      this.setState({errorMessage: "Please enter all the details correctly!"});
    } else {
      this.setState({disabled: true});
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => { 
          firebase.database().ref('transporters').push({ email: this.state.email, username: this.state.username, phoneno: this.state.phoneno })
          .then(() => this.props.navigation.navigate('Login'))
          .catch(error => this.setState({ errorMessage: error.message, disabled: false }));
        })
        .catch(error => this.setState({ errorMessage: error.message, disabled: false }));  
    }
  }

  _onSignup() {
    this.handleSignUp();
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
            placeholder='Username'
            onChangeText={(usernamee) => this.setState({username: usernamee})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Phone Number'
            onChangeText={(phonenoo) => this.setState({phoneno: phonenoo})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            placeholder='Password'
            textContentType='password'
            onChangeText={(passwordd) => this.setState({password: passwordd})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            placeholder='Retype Password'
            textContentType='password'
            onChangeText={(retypePasswordd) => this.setState({retypePassword: retypePasswordd})}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button
            title="Sign Up"
            disabled={this.state.disabled}
            onPress={this._onSignup}
          />
        </View>

        <ErrorMessage errorMessage={this.state.errorMessage} />

        <Text style={{padding: 10, fontSize: 20}}>
          Already registered? &nbsp;
          <Text style={{padding: 10, fontSize: 30, color: '#841584'}} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
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
    margin: 6, 
    width: 300,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  btnContainer: {
    padding: 20, 
    width: 200,
  }
});

