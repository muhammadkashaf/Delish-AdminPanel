// {this.props.fetching ? <Spinner /> : finalArr.length > 0 ? finalArr.map((value, index) => {
//     if (value) {
//        var number = Number(5)
//        var charges = number.toFixed(2)

//    }
//    // console.log(http://churppy.com/churppy/public/site/images/${value.business_logo})
//    let headerObj = {
//        image: http://churppy.com/public/site/images/${value.business_logo},
//        duration: "25 Min",
//        charges

//    }
//    return (
//        <View
//            style={{
//                flexDirection: 'row',
//                width: '100%',
//                justifyContent: 'space-between',
//                borderBottomColor: '#dddddd',
//                borderBottomWidth: 2,

//            }}>
//            <View
//                style={{
//                    width: '24.5%',
//                    // backgroundColor: '#f5f5f5',
//                    paddingVertical: 10,
//                    // borderBottomColor: '#dddddd',
//                    // borderBottomWidth: 2,
//                    paddingHorizontal: 5,
//                    alignItems: 'center',
//                    justifyContent: 'center'
//                }}>
//                <Image source={{ uri: http://churppy.com/public/site/images/${value.business_logo} }} style={{ height: 50, width: "100%" }} />
//            </View>
//            <View
//                style={{
//                    width: '24.5%',
//                    // backgroundColor: '#f5f5f5',
//                    paddingVertical: 10,
//                    // borderBottomColor: '#dddddd',
//                    // borderBottomWidth: 2,
//                    paddingHorizontal: 5,
//                    alignItems: 'center',
//                    justifyContent: 'center'
//                }}>
//                <Text style={{ fontSize: 12, color: '#ac82bc', fontWeight: 'bold', fontFamily: "Poppins-Regular_0" }}>{value.business_title}</Text>
//            </View>
//            <View
//                style={{
//                    width: '24.5%',
//                    // backgroundColor: '#f5f5f5',
//                    paddingVertical: 10,
//                    // borderBottomColor: '#dddddd',
//                    // borderBottomWidth: 2,
//                    paddingHorizontal: 5,
//                    alignItems: 'center',
//                    justifyContent: 'center'
//                }}>
//                <Text style={{ fontSize: 12, color: '#bdbdbd', fontWeight: 'bold', fontFamily: "Poppins-Regular_0" }}>{value.added_date}</Text>
//            </View>
//            <View
//                style={{
//                    width: '24.5%',
//                    // backgroundColor: '#f5f5f5',
//                    paddingVertical: 10,
//                    // borderBottomColor: '#dddddd',
//                    // borderBottomWidth: 2,
//                    paddingHorizontal: 5,
//                    alignItems: 'center',
//                    justifyContent: 'center'
//                }}>
//                <Button
//                //  onPress={() => { 
//                    // this.props.navigation.navigate('Cart') 

//                    // }} 
//                    onPress={() => { 
//                        console.log("value", value)
//                        this.props.getCategories(value.merchant_id, headerObj) }}
//                    success rounded style={{ width: '100%', justifyContent: 'center', height: 25 }}>
//                    <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold', fontFamily: "Poppins-Regular_0" }} >Place Order</Text>
//                </Button>
//                <Button onPress={() => {
//                  this.removeFav(index)
//                }} danger rounded style={{ width: '100%', justifyContent: 'center', height: 25, marginTop: 2 }}>
//                    <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold', fontFamily: "Poppins-Regular_0" }} >Remove</Text>
//                </Button>
//            </View>
//        </View>
//    )
// }) : <Text style={{ textAlign: 'center' }}>There is no favourite</Text>}















import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

import {
    Header,
    Body,
    Title,
} from 'native-base';

;

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { orange } from '../ColorTheme/color'
import { Table, Row, Rows } from 'react-native-table-component';


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['id', 'Name', 'Latitude', 'Longitude', 'Locate'],
            tableData: []
        }
    }


    getLocation = () => {
        // Alert.alert(`This is row ${index + 1}`);
        this.props.navigation.navigate('GoogleMap')
    }

    static navigationOptions = {
        drawerLabel: () => null,
    };



    componentDidMount() {


        const formData = new FormData();

        formData.append("action", "show_restaurants")

        axios.post('http://www.hnh5.xyz/delish/api/restaurants.php', formData)
            .then(res => {
                console.log(res);
                console.log(res.data.status);
                const formattedData = generateTableData(res)
                console.log('res');
                
                if (res.data.status === true) {
                    this.setState({ tableData: formattedData })
                }
                else {
                    null
                }
            })
    }


    generateTableData(data) {
        // let tableData = [];
        // for (let d of data) {
            console.log('func');
        //     tableData.push(keys.map(key => d[key]))
        // }
        return tableData;
    }


    render() {
        const state = this.state;

        const element = (data, index) => (
            <TouchableOpacity onPress={this.getLocation}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Locate</Text>
                </View>
            </TouchableOpacity>
        );


        return (



            < View style={styles.container} >

                {/* Start Header View*/}

                < Header style={{ backgroundColor: orange }} noShadow>

                    <Body>
                        <Title style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }}>Dashoard</Title>
                    </Body>

                </Header >

                {/* End Header  View*/}


                <View style={{ alignContent: 'center', marginTop: '10%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, color: orange }}>Welcome to your Dashboard</Text>
                </View>

                <View style={styles.stroke}></View>





                {this.state.tableData ? <View style={styles.containerTable}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={state.tableData} textStyle={styles.text} />
                    </Table>
                </View> : null}



            </View >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F3F3F3',
    },
    stroke: {
        alignSelf: 'center',
        width: '95%',
        borderColor: orange,
        borderWidth: 1,
    },

    containerTable: { flex: 1, padding: 1, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { textAlign: 'center', justifyContent: 'space-around' }


});

