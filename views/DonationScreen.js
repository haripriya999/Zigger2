import React from 'react';
import {Alert, Platform, StyleSheet, Text, View, Image, Button, Linking } from 'react-native';
import Bananas from './utils/Bananas';
import firebase from 'firebase';
import { showLocation } from 'react-native-map-link'
import LinearGradient from 'react-native-linear-gradient';

export default class DonationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {errorMessage: '', hasDonation: false, donation: null, donationuid: null,currentLat:17.3850 ,currentLong:78.4867};
        this.fetchData();
    }

    static navigationOptions = () => ({
        headerTintColor: 'white',
        headerStyle: {
        backgroundColor: 'black'
        },
    });
  
    fetchData() {
        firebase.database().ref('donations').limitToFirst(1).once('value')
        .then(donation => {
            let don = JSON.parse(JSON.stringify(donation));
            this.setState({donation: don[Object.keys(don)[0]], donationuid: Object.keys(don)[0], hasDonation:true});
        })
        .catch(error => this.setState({errorMessage: error.message}));
    }

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
         position => {
              this.setState({currentLat : parseFloat(JSON.stringify(position.coords.latitude)) , currentLong: parseFloat(JSON.stringify(position.coords.longitude))});
         },
         error => alert(JSON.stringify(error)),
         { enableHighAccuracy: true, timeout: 20000 }
        );
      };

    openMap() {
        showLocation({
            latitude: this.state.donation.donorLat,
            longitude: this.state.donation.donorLng,
            sourceLatitude: this.state.currentLat,  // optionally specify starting location for directions
            sourceLongitude: this.state.currentLong,  // not optional if sourceLatitude is specified
            title: 'The White House',  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            appsWhiteList: ['google-maps'] // optionally you can set which apps to show (default: will show all supported apps installed on device)
            // app: 'uber'  // optionally specify specific app to use
        })
    }

    openMap2(){
        showLocation({
            latitude: this.state.donation.distLat,
            longitude: this.state.donation.distLng,
            sourceLatitude: this.state.currentLat,  // optionally specify starting location for directions
            sourceLongitude: this.state.currentLong,  // not optional if sourceLatitude is specified
            title: 'The White House',  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            appsWhiteList: ['google-maps'] // optionally you can set which apps to show (default: will show all supported apps installed on device)
            // app: 'uber'  // optionally specify specific app to use
        })
    }

    render() {
    const {navigate} = this.props.navigation;
    const cuser = JSON.parse(JSON.stringify(this.props.navigation.getParam('user')));
    const info = this.state.donation;
    if(this.state.hasDonation) {
        return (
            <LinearGradient
            colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 0.0}}
            style={styles.container}>
                <View style={styles.card}>  
                    <Text style={styles.show}>  
                       Distributor PhoneNo: {info.distPhoneno}
                    </Text>
                    <Text style={styles.show}>
                       Donor PhoneNo: {info.donorPhoneno}
                    </Text>
                    <Text style={styles.show}>
                        Food Units: {info.foodUnits}
                    </Text>
                    <View style={styles.btnContainer}>
                        <Button
                        title="Directions to donor"
                        onPress={this.openMap.bind(this)}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button
                        title="Directions to distributor"
                        onPress={this.openMap2.bind(this)}
                        />
                    </View>
                    
                </View>

            </LinearGradient>
        );    
    } else {
        return (
            <LinearGradient
            colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 0.0}}
            style={styles.container}>
                <Text style={{color: 'white', fontSize: 24}}>Searching for donation...</Text>
            </LinearGradient>
        );
    }
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
