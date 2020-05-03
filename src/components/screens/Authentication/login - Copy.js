import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from 'react-native';

import {
  Header,
  Left,
  Body,
  Title,
  Button,
  Spinner
} from 'native-base';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { orange } from '../ColorTheme/color'


navigationOptions = {
  drawerLabel: () => null,
};

export default function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);


  checkField = (key) => {
    if (key == "password") {
      if (password.length > 5) {
        setPasswordErr({ passwordErr: false })
      }
      else {
        setPasswordErr({ passwordErr: true })
      }
    } else {
      if (!this.state[key]) {
        this.setState({
          [`${key}Err`]: true
        })
      } else {
        this.setState({
          [`${key}Err`]: false
        })
      }
    }
  }
}


setPasswordVisibility = () => {
  this.setState({ hidePassword: !this.state.hidePassword });
}

