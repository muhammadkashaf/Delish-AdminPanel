//import liraries
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
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component'


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['id', 'Name', 'Lat', 'Long', 'Locate'],
            tableData: [
                ['1', '2', '3', '4', '5'],
                ['a', 'b', 'c', 'd', 'e'],
                ['1', '2', '3', '4', '5'],
                ['a', 'b', 'c', 'd', 'e']
            ]
        }
    }


    getLocation = () => {
        // Alert.alert(`This is row ${index + 1}`);
        this.props.navigation.navigate('GoogleMap')
    }

    static navigationOptions = {
        drawerLabel: () => null,
    };


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


                <View style={styles.containerTable}>
                    <Table borderStyle={{ borderColor: 'transparent' }}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        {
                            state.tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
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
    containerTable: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }

});

