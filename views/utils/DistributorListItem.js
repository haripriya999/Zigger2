import React from 'react';
import {Platform, StyleSheet, Text, View, Button, Linking, ToastAndroid} from 'react-native';
import firebase from 'firebase';
import ErrorMessage from '../utils/ErrorMessage';

export default class DistributorListItem extends React.Component {

  constructor(props) {
    super(props);
    this.cuser = this.props.user;
    this.cuser = this.cuser[Object.keys(this.cuser)[0]];
    this.state = {errorMessage: ''};
  }

  openMap(latitude, longitude) {
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = `${latitude},${longitude}`;
      const label = 'Custom Label';
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
  
      Linking.openURL(url); 
  }

  claimUnit() {
    firebase.database().ref('distributors').orderByChild('username').equalTo(this.props.username).limitToFirst(1).once('value')
    .then(cdistributor => {
      cdistributor = JSON.parse(JSON.stringify(cdistributor));
      cdistributor = cdistributor[Object.keys(cdistributor)[0]];
      if(cdistributor.foodUnits >= 2) {
        firebase.database().ref('distributors/'+this.props.uid).update({
          foodUnits: cdistributor.foodUnits-1,
        }).then(() => {
          firebase.database().ref('distributors/'+this.props.uid+'/claimants').push({ username: this.cuser.username })
          .then(() => ToastAndroid.show('Unit from ' + cdistributor.username + ' claimed!', ToastAndroid.SHORT))
          .catch((error) => this.setState({ errorMessage: error.message }));
        })
        .catch(error => this.setState({ errorMessage: error.message }));
      } else {
        ToastAndroid.show('No units left!', ToastAndroid.SHORT);
      }
    })
    .catch(error => this.setState({ errorMessage: error.message }));
  }

  render() {
   return (
      <View style={styles.container}>
        <View style={styles.cardLeftContainer}>
          <Text style={{color: '#4CBB17', fontSize: 24}}>{this.props.username}</Text>
          <Text>
            <Text style={{color: '#DC143C', fontSize: 20}}>Units left:</Text> {this.props.foodUnits}
          </Text>
          <ErrorMessage errorMessage={this.state.errorMessage} />
        </View>
        
        <View style={styles.cardRightContainer}>
          <View style={styles.cardBtnContainer}>
              <Button title="View Map" onPress={() => this.openMap(this.props.latitude, this.props.longitude)}></Button>
          </View>

          <View style={styles.cardBtnContainer}>
              <Button title="Claim Unit" onPress={() => this.claimUnit()}></Button>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderBottomWidth: 3,
  },
  btnContainer: {
    margin: 20, 
    width: 200,
  },
  cardLeftContainer: {
    width: '50%',
  },
  cardRightContainer: {
    width: '50%',
  },
  cardBtnContainer: {
    margin: 5,
    width: 100,
    alignSelf: 'flex-end'
  }
});
