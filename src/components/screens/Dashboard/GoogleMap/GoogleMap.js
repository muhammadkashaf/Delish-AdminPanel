import React, { Component } from 'react';

import {
    Dimensions,
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {
    Header,
    Left,
    Body,
    Title,
    Icon,
    Button,
    Right
} from 'native-base';

import { SearchBar } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import { orange } from '../../ColorTheme/color';





export default class GoogleMap extends Component {

    static navigationOptions = {
        drawerLabel: () => null,
    };

    state = {
        focusedlocation: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
        },
        search: '',
        showSearchBar: false,
        locationChosen: false,
    }


    search = () => {
        let { showSearchBar } = this.state;
        this.setState({
            showSearchBar: !showSearchBar,
        });
    }

    componentDidMount() {
        this.getLocationHandler();
    }



    updateSearch = search => {
        this.setState({ search });
    };

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedlocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedlocation: {
                    ...prevState.focusedlocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
    }

    getLocationHandler = () => {
        Geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },
            err => {
                console.log(err);
                alert("Fetching the position failed, please enable GPS manually!");
            })
    }





    render() {
        let marker = null;
        const { showSearchBar, search } = this.state;


        if (this.state.locationChosen) {
            marker = <MapView.Marker draggable coordinate={this.state.focusedlocation}
                onDragEnd={(e) => this.setState({ focusedlocation: { ...this.state.focusedlocation, ...e.nativeEvent.coordinate } })} />;

        }
        return (
            <View style={styles.container} >

                {/* Start Header View*/}

                <Header style={{ backgroundColor: '#FFFF' }} noShadow>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAddress')}>
                            <Icon style={{ color: orange, fontSize: 17 }} type="AntDesign" name="arrowleft" />
                        </TouchableOpacity>
                    </Left>

                    <Body>


                        <View>
                            {!showSearchBar ? (
                                <Title style={{ color: 'black', right: '10%' }}>Current Location</Title>

                            ) : (
                                    <SearchBar
                                        placeholder="Type Here..."
                                        onChangeText={this.updateSearch}
                                        value={search}
                                        containerStyle={{ backgroundColor: 'white', width: 200 }}
                                        inputContainerStyle={{ backgroundColor: 'white' }}
                                        placeholderTextColor='#86939e'
                                        searchIcon={false}
                                        inputStyle={{ color: 'black' }}


                                    />
                                )}
                        </View>
                    </Body>


                    <Right>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={this.search}>
                                <Icon style={{ color: orange, fontSize: 20, marginRight: '20%' }} type="EvilIcons" name="search" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.getLocationHandler}>
                                <Icon style={{ color: orange, fontSize: 20, marginLeft: 20 }} type="Ionicons" name="md-locate" />
                            </TouchableOpacity>



                        </View>
                    </Right>


                </Header>

                {/* End Header  View*/}

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={this.state.focusedlocation}
                        onPress={this.pickLocationHandler}
                        ref={ref => this.map = ref}
                    >
                        {marker}
                    </MapView>

                    <Button onPress={() => this.props.navigation.navigate('AddNewAddress')} block style={{ backgroundColor: orange, position: 'absolute', bottom: '10%', width: '95%', alignSelf: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>FIND RESTAURANTS</Text>
                    </Button>
                </View>

            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        marginTop: '14%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})