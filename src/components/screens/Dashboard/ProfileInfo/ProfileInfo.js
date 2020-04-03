import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert,
    Image
} from 'react-native';

import {
    Header,
    Left,
    Body,
    Title,
    Icon,
    Item,
    Input,
    Label
} from 'native-base';


import Menu, { MenuItem } from 'react-native-material-menu';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { orange } from '../../ColorTheme/color';
import AuthLoading from '../../AuthLoading/AuthLoading';






export default class ProfileInfo extends Component {


    static navigationOptions = {
        drawerLabel: () => null,
    };

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            name: '',
            email: '',
            contact: '',
            code: "",
            password: "",
            newPassword: "",
            loader: false,

        };

        _menu = null;

        setMenuRef = ref => {
            this._menu = ref;
        };

    }





    async componentDidMount() {

        try {
            let uid = await AsyncStorage.getItem('uid');
            const formData = new FormData();


            formData.append("action", "show_by_user_id"),
                formData.append("id", uid)

            let data = {
                action: "show_by_user_id",
                id: uid
            };
            axios.post('http://www.hnh5.xyz/delish/api/user.php', formData)
                .then(res => {
                    this.setState({
                        id: res.data.data.id,
                        name: res.data.data.first_name + ' ' + res.data.data.last_name,
                        email: res.data.data.email,
                        contact: res.data.data.contact_no,

                    })
                }).catch(err => {
                    console.log("err => ", err);
                });

        } catch (error) {
            console.log("wrong", error);

        }
    }


    changePassword1 = async () => {
        const { password, newPassword, email, code } = this.state
        this.setState({ loader: true })
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (password != newPassword) {
            this.setState({ loader: false })
            Alert.alert("Alert", "Password not Matched")
        } else {


            const formData = new FormData();
            formData.append("action", "reset_password")
            formData.append("email", email)
            formData.append("password1", password)
            formData.append("password2", newPassword)

            // console.log("email, code, password", email, code, password, newPassword)

            axios.post("http://www.hnh5.xyz/delish/api/password.php", formData)
                .then(res => {

                    console.log('*******----', res);
                    console.log('*********', res.data);
                    console.log('*********', res.data.status);

                    if (res.data.status === true) {
                        this.setState({ loader: false })
                        Alert.alert("Alert", "Password Changed successfully")
                        this.props.navigation.navigate('AuthLoading')
                    } else {
                        this.setState({ loader: false })
                        Alert.alert("Alert", res.message)
                    }
                    console.log("Alert", res)
                })
                .catch(err => {
                    this.setState({ loader: false })
                    console.log("err err err", err)
                });
        }


    }




    render() {

        const { _menu } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView>
                    {/* Start Header View*/}

                    <Header style={{ backgroundColor: orange }} noShadow>
                        <Left>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AuthLoading')} transparent>
                                <Icon style={{ color: 'white' }} type="Entypo" name="cross" />
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Title style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Profile Info</Title>

                        </Body>

                        <TouchableOpacity>
                            <Menu
                                ref={(ref) => this.menu = ref}
                                button={<Icon onPress={() => {
                                    this.menu.show()


                                }} style={{ fontSize: 20, color: '#FFFF', marginTop: 20 }} name="dots-vertical" type="MaterialCommunityIcons" />}
                            >
                                <MenuItem onPress={() => {
                                    this.setState({ isVisible: true })
                                    this.menu.hide()
                                }} >Change Password</MenuItem>

                            </Menu>
                        </TouchableOpacity>

                    </Header>


                    {/* End Header  View*/}








                    {/* Start Card View*/}

                    <View style={{ width: '95%', backgroundColor: '#FFFF', marginTop: 20, alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: '5%', marginTop: 20 }} > Contact Info</Text>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
                                <Text style={{ fontWeight: 'bold', color: '#FFA800', fontSize: 15, marginRight: '5%', marginTop: 20 }}>EDIT</Text>
                            </TouchableOpacity>
                        </View>



                        <View style={{ marginTop: 20, paddingVertical: 10 }}>
                            <Text style={{ marginLeft: '5%' }}>{this.state.name}</Text>

                            <Text style={{ marginLeft: '5%', marginTop: '3%' }}>{this.state.email}</Text>

                            <Text style={{ marginLeft: '5%', marginTop: '3%' }}>{this.state.contact}</Text>
                        </View>


                    </View>

                    {/* End Header View*/}



                    <Modal
                        animationType={"fade"}
                        transparent={true}

                        visible={this.state.isVisible}

                        onRequestClose={() => { this.setState({ isVisible: false }) }}>
                        {/*All views of Modal*/}
                        <View style={styles.modal}>
                            <Text style={styles.text}>Change Password</Text>



                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }} >
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                    <Image source={require("../../../../Assets/Images/lockopen.png")} style={{ height: 20, width: 15 }} />
                                </View>
                                <Item stackedLabel style={{ width: '80%', borderBottomWidth: 0 }}>
                                    <Label style={{ marginLeft: 3, color: 'lightgray' }}>Password</Label>
                                    <Input secureTextEntry value={this.state.password} placeholder="*********" style={{ color: 'gray', width: '100%' }} onChangeText={(e) => { this.setState({ password: e }) }} />
                                </Item>
                            </View>


                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }} >
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                    <Image source={require("../../../../Assets/Images/lockopen.png")} style={{ height: 20, width: 15 }} />
                                </View>
                                <Item stackedLabel style={{ width: '80%', borderBottomWidth: 0 }}>
                                    <Label style={{ marginLeft: 3, color: 'lightgray' }}>Confirm Password</Label>
                                    <Input secureTextEntry value={this.state.newPassword} placeholder="*********" style={{ color: 'gray', width: '100%' }} onChangeText={(e) => { this.setState({ newPassword: e }) }} />
                                </Item>
                            </View>


                            <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-end', marginTop: '10%' }}>
                                <TouchableOpacity style={{ marginRight: '5%', width: 100, backgroundColor: '#FFA800', paddingVertical: 20, bottom: 20, marginTop: '2%' }}>
                                    <Text onPress={() => { this.setState({ isVisible: false }) }} style={{ fontWeight: 'bold', color: '#FFFF', textAlign: 'center', }}>CANCEL</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.changePassword1} style={{ marginRight: '5%', width: 100, backgroundColor: '#FFA800', paddingVertical: 20, bottom: 20, marginTop: '2%' }}>
                                    <Text style={{ fontWeight: 'bold', color: '#FFFF', textAlign: 'center', }}>UPDATE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>



                </ScrollView>

            </View >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#F3F3F3',
    },
    modal: {

        backgroundColor: "white",
        height: 300,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 80,
        marginLeft: 40,

    },
    text: {
        marginTop: '10%',
        marginLeft: '5%',
        fontSize: 20,
        fontWeight: 'bold',
    }

})