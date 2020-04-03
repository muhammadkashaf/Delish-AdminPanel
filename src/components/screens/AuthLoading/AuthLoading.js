import React, { Component } from "react";

import {
    ActivityIndicator,
    StyleSheet
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';



class AuthLoading extends Component {

    constructor() {
        super()

    }

    componentDidMount() {
        this.load();
    }

    load = async () => {
        const user = await AsyncStorage.getItem('email');
        console.log("***************", user);
        this.props.navigation.navigate(user ? 'App' : 'Auth');
    }

    render() {
        return (
            <ActivityIndicator style={styles.loading} />
        );
    }
};


const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default AuthLoading;