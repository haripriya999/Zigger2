import React from 'react';
import {Alert, Platform, StyleSheet, Text, View, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
import ErrorMessage from './utils/ErrorMessage';
import DistributorListItem from './utils/DistributorListItem';
import firebase from 'firebase';

export default class DistributorScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {distributors: [], errorMessage: '', refreshing: false};
    this.distributors = [];
    this.fetchData();
  }

  fetchData() {
    this.distributors = [];
    return (firebase.database().ref('distributors').once('value')
    .then(distributors => {
        distributors = JSON.parse(JSON.stringify(distributors));
        Object.keys(distributors).map((id) => this.distributors.push({ uid: id, username: distributors[id].username, latitude: distributors[id].latitude
            , longitude: distributors[id].longitude, foodUnits: distributors[id].foodUnits}));
        this.setState({ distributors: this.distributors });
    })
    .catch(error => this.setState({ errorMessage: error.message })));
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    const cuser = JSON.parse(JSON.stringify(this.props.navigation.getParam('user')));
    return (
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >

        <FlatList
            data={this.state.distributors}
            renderItem={({item}) => <DistributorListItem user={cuser} uid={item.uid} username={item.username} latitude={item.latitude} longitude={item.longitude}
             foodUnits={item.foodUnits}></DistributorListItem>}
        />

        <ErrorMessage errorMessage={this.state.errorMessage} />
        
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5FCFF',
  },
  btnContainer: {
    margin: 20, 
    width: 200,
  },
});
