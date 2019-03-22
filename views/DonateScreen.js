import React from 'react';
import {Alert, Platform, StyleSheet, Text, View, Image, TextInput, Button, ToastAndroid} from 'react-native';
import Bananas from './utils/Bananas';
import ErrorMessage from './utils/ErrorMessage';
import firebase from 'firebase';

export default class DonateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.cuser = JSON.parse(JSON.stringify(this.props.navigation.getParam('user')));
    this.cuser = this.cuser[Object.keys(this.cuser)[0]];
    this.state = {units: 0, lat: 0, lng: 0, errorMessage: '', disabled: false};
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
     position => {
          this.setState({lat : JSON.stringify(position.coords.latitude) , lng: JSON.stringify(position.coords.longitude)});
     },
     error => alert(JSON.stringify(error)),
     { enableHighAccuracy: true, timeout: 20000 }
    );
  };

  donate() {
    this.setState({disabled: true});
    firebase.database().ref('distributors').limitToFirst(1).once('value')
    .then((cdistributor) => {
      cdistributor = JSON.parse(JSON.stringify(cdistributor));
      cdistributor = cdistributor[Object.keys(cdistributor)[0]];
      firebase.database().ref('donations').push({ 
        foodUnits: this.state.units,
        donorLat: this.state.lat,
        donorLng: this.state.lng,
        donorPhoneno: this.cuser.phoneno,
        distLat: cdistributor.latitude,
        distLng: cdistributor.longitude,
        distPhoneno: cdistributor.phoneno,
      })
      .then(() => { ToastAndroid.show(this.state.units+' units donated!', ToastAndroid.SHORT); this.setState({disabled: false})} )
      .catch(error => { this.setState({disabled: false, errorMessage: error.message}); });
    })
    .catch(error => { this.setState({disabled: false, errorMessage: error.message}); });
  }

  render() {
    const {navigate} = this.props.navigation;
    const cuser = JSON.parse(JSON.stringify(this.props.navigation.getParam('user')));
    return (
      <View style={styles.container}>

        <Text>How many units of food would you like to donate?</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Units'
            onChangeText={(unitss) => this.setState({units: unitss})}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button
            title="Donate"
            disabled={this.state.disabled}
            onPress={() => this.donate()}
          />
        </View>

        <ErrorMessage errorMessage={this.state.errorMessage}></ErrorMessage>

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
    width: 100,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  btnContainer: {
    padding: 20, 
    width: 150,
  }
});

