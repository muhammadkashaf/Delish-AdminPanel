import React, { Component } from 'react';
import { View } from 'react-native';

import Routes from './src/components/screens/Routes/Navigation';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    return (
      
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
    )
  }
}

