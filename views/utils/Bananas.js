import React from 'react';
import { Image } from 'react-native';

export default class Bananas extends React.Component {
  render() {
    let pic = {
      uri: 'https://images-na.ssl-images-amazon.com/images/I/71gI-IUNUkL._SY355_.jpg'
    };

    return (
      <Image source={pic} style={{width: 193, height: 110}} />
    );
  }
}
