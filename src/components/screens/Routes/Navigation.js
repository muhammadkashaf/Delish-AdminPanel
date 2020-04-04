import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { View, Icon } from 'native-base';
import { SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';



import SignIn from '../Authentication/login';
import Home from '../Dashboard/Dashboard';


import AuthLoadingScreen from '../../screens/AuthLoading/AuthLoading';
import GoogleMap from '../Dashboard/GoogleMap/GoogleMap';









class DrawerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }

    }




    async componentDidMount() {
        let name = await AsyncStorage.getItem('name');
        this.setState({
            name: name
        })
    }





    signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    };






    render() {

        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} >

                <View>

                    <DrawerNavigatorItems {...this.props} />

                    <View style={{ width: '100%', backgroundColor: 'orange', paddingTop: '40%', paddingBottom: '8%', marginTop: -10 }}>
                        <Text style={{ marginLeft: '5%', fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>{this.state.name}</Text>
                    </View>



                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileInfo')}>
                        <View style={{ flexDirection: 'row' }} >

                            <View style={{marginTop: '5%', alignSelf: 'center', marginLeft: '5%' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>My profile</Text>
                            </View>
                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => this.signOutAsync()} style={{ flexDirection: 'row', padding: 15, marginLeft: '5%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }} >Logout</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )

    }
}







const DrawerNavigator = createDrawerNavigator({
    Home: Home,
    SignIn: SignIn,
    GoogleMap: GoogleMap


},
    {
        contentComponent: DrawerComponent,

        contentOptions: {
            labelStyle: {

            }
        }
    }
);



const AuthStackNavigator = createDrawerNavigator({
    SignIn: SignIn,
    Home: Home,
    GoogleMap: GoogleMap
},
);


const SwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: DrawerNavigator,
});



export default createAppContainer(SwitchNavigator);