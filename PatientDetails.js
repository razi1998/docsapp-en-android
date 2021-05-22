import React , { useState, useEffect }from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios'

function PatientDetails({ navigation,route }) {

    const nav = useNavigation();

    const [state, setState] = useState({
        patient: []
    })
    // console.log("Patient : ",route.params.patientno)
    useEffect(() => {
        axios.get(`http://192.168.0.105:4000/patient/${route.params.patientno}`).then(res => {
            setState({
                ...state,
                patient: res.data
            })
        })
    }, [])
    return (
            <View style={styles.container}>
                <Ionicons style={styles.back} onPress={() => { nav.goBack(); }} name="arrow-back" size={24} color="black" />
                <FontAwesome style={{alignSelf: 'center'}} name="user-circle-o" size={100} color="black" />
                <View style={styles.maincontainer}>
                    <Text style={styles.head}>{state.patient.name}</Text>
                    <Text style={styles.text}>DOA: {state.patient.dob}</Text>
                    <Text style={styles.text}>Patient no.: {state.patient.patientno}</Text>
                    <Text style={styles.text}>Gender: {state.patient.gender}</Text>
                    <Text style={styles.text}>Age: {state.patient.age}</Text>
                    <Text style={styles.text}>Email: {state.patient.email}</Text>
                    <Text style={styles.text}>Disease: {state.patient.disease}</Text>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#dae3f3',
        padding: 20,
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
        marginTop:35
    },
    head: {
        fontSize: 24,
        color: 'black',
        marginBottom: 40,
        fontWeight: 'bold',
        alignSelf: 'center', 
        borderBottomWidth:2,
        borderBottomColor: 'black'
    },
    text: {
        fontSize: 20,
        color: 'black',
        padding:20
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 10,
        color: 'black',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,

    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#203864',
        marginTop: 20
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PatientDetails