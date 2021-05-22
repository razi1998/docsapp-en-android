import React, { useState, useEffect } from "react"
import axios from "axios";
import { Button, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
const Delete = ({ navigation, route }) => {
    const nav = useNavigation();
    console.log(route.params.patientno)
    const confirm = () => {
        console.log("this is confirm function")
        axios.delete(`http://192.168.0.105:4000/patient/${route.params.patientno}`)
        navigation.navigate("View all")
        console.log(route.params.patientno)
    }
    return (
        <View style={styles.container}>
            <Ionicons style={styles.back} onPress={() => { nav.goBack(); }} name="arrow-back" size={24} color="black" />
            <View style={styles.maincontainer}>
                <Text style={{alignSelf: 'center', fontSize:20, fontWeight: 'bold',}}>Are you sure?</Text>
                <TouchableOpacity style={styles.button}
                    onPress={confirm}>
                    <Text style={styles.btntxt}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#dae3f3',
        padding:20,
        paddingTop:40,
        marginTop:35
    },

    maincontainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#dae3f3',
        padding:20,
    },
    back: {
        marginRight: 'auto',
        padding: 10,
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#203864',
        marginTop: 20
    },
    btntxt: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5
    },
})
export default Delete;