import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

import {
    Header,
    Body,
    Title,
} from 'native-base';

import axios from 'axios';
import { orange } from '../ColorTheme/color'
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['id', 'Name', 'Latitude', 'Longitude', 'Locate'],
            tableValues: []
        }
    }


    getLocation = () => {
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
                console.log('res.data', res.data);
                console.log('res.data.data', res.data.data);
                let formattedData = this.generateTableData(res.data.data, ['id', 'name', 'latitude', 'longitude', '']);
                this.setState({ tableValues: formattedData })
            })
    }




    generateTableData(data, keys) {
        let tableData = [];
        for (let d of data) {
            tableData.push(keys.map(key => d[key]))
        }
        return tableData;
    }


    render() {
        const state = this.state;



        const element = (data, index) => (
            <TouchableOpacity onPress={() => this.getLocation()}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>locate</Text>
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





                {this.state.tableValues ? <View style={styles.containerTable}>

                    <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        {
                            state.tableValues.map((rowData, index) => (
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

                </View > : null
                }



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

    containerTable: { flex: 1, padding: 15, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6, textAlign: 'center' },
    row: { flexDirection: 'row' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2, alignSelf: 'center' },
    btnText: { textAlign: 'center', color: '#fff' }

});

