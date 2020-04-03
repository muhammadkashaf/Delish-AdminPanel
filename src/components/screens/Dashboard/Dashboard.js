//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

import {
    Header,
    Body,
    Title,
} from 'native-base';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { orange } from '../ColorTheme/color'

// create a component
export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            HeadTable: ['id', 'Name', 'Latitude', 'Longitude', 'GetLocation'],
            DataTable: [
                ['1', '2', '3', '4', '5'],
                ['a', 'b', 'c', 'd', 'e'],
                ['1', '2', '3', '4', '5'],
                ['a', 'b', 'c', 'd', 'e'],
                ['1', '2', '3', '4', '5']
            ]
        }
    }

    static navigationOptions = {
        drawerLabel: () => null,
    };


    render() {
        const state = this.state;



        return (



            < View style={styles.container} >

                {/* Start Header View*/}

                < Header style={{ backgroundColor: orange }} noShadow>

                    <Body>
                        <Title style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }}>Dashoard</Title>
                    </Body>

                </Header >

                {/* End Header  View*/}


                <View style={{ alignSelf: 'center', marginTop: '10%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, color: orange }}>Welcome to your Dashboard</Text>
                </View>

                <View style={styles.stroke}></View>



                <View style={styles.containerTable}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
                        <Row data={state.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
                        <Rows data={state.DataTable} textStyle={styles.TableText} />
                    </Table>
                </View>



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
    containerTable: { 
        flex: 1,
        padding: 18,
        paddingTop: 35,
        backgroundColor: '#ffffff' 
      },
      HeadStyle: { 
        height: 70,
        width: '100%',
        alignContent: "center",
        backgroundColor: '#ffe0f0'
      },
      TableText: { 
        margin: 10
      }
});

