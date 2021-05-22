import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { MaterialCommunityIcons, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';

function PatientScreen({ navigation, route }) {
    // console.log(route.params.patientno)
    return (
        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 1 }}>
            <Text style={styles.dtxt}>Hello {route.params.name}</Text>
            <SimpleLineIcons style={styles.signout} onPress={() => navigation.navigate('PLoginScreen')} name="logout" size={30} color="black" />
            <View style={styles.container}>
                <TouchableOpacity style={{ marginBottom: 10, padding: 10, paddingBottom: 10 }}
                    onPress={() => navigation.navigate('View Patient', { patientno: route.params.patientno })}>
                    <LinearGradient colors={['#E9EEF8', '#C3D2EC', '#ABC0E4']} style={styles.button}>
                        <FontAwesome name="user-circle-o" size={24} color="black" />
                        <Text style={styles.btntxt}>Profile</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: 10, padding: 10, paddingBottom: 10 }}
                    onPress={() => navigation.navigate('View Patient Vital', { patientno: route.params.patientno, name: route.params.name })}>
                    <LinearGradient colors={['#E9EEF8', '#C3D2EC', '#ABC0E4']} style={styles.button}>
                        <MaterialCommunityIcons name="file-search-outline" size={24} color="black" />
                        <Text style={styles.btntxt}>All Vitals</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 60,
        paddingRight: 60,
        backgroundColor: '#dae3f3'
    },
    header: {
        fontSize: 24,
        color: 'black',
        marginBottom: 40,
        fontWeight: 'bold'
    },
    signout: {
        marginLeft: 'auto',
        padding: 10,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: 'black',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    btntxt: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5,

    },
    dtxt: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5,
        marginTop: 50,
        alignSelf: 'center'
    },
})
export default PatientScreen