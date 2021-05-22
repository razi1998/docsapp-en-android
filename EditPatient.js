
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function EditPatient({ navigation }) {
    const nav = useNavigation();
    const [state, setState] = useState({
        name: "",
        dob: "",
        disease: "",
        detail: [],
        regno: "",
        gender: "",
        age: "",
    })
    const [state1, setState1] = useState({
        ids: [],
    })

    const [selectedValue, setSelectedValue] = useState("");
    useEffect(() => {
        axios.get("http://192.168.0.105:4000/patient").then(res => {
            const arr = res.data.map(data => ({
                "regno": data.regno
            }))
            setState1({
                ...state1,
                ids: arr
            })
        })
    })
    const onChangeText = (key, val) => {
        setState({
            ...state,
            [key]: val
        })

    }
    

    const submit = () => {
        console.log(state)
        // if (state.name && state.dob && state.patientno && state.disease && state.regno && state.age) {
        axios.post("http://192.168.0.105:4000/patient", {
            name: state.name,
            dob: state.dob,
            disease: state.disease,
            regno: state.regno,
            detail: state.detail,
            gender:state.gender,
            age: state.age
        })
        navigation.navigate('Doctor Home')
        // }
        // }
        //     else
        //     {

        //       if(!state.name)
        //       {
        //         alert("Please enter name")
        //       }
        //       else if(!state.regno)
        //       {
        //         alert("Please enter registration no")
        //       }
        //       else if(!state.email)
        //       {
        //         alert("Please enter the email")
        //       }
        //       else if(!state.password)
        //       {
        //         alert("Please enter the password")
        //       }

        //       else if(!state.mob)
        //       {
        //         alert("Please enter the mob no")
        //       }
        //     }
        //   }
        //   else{
        //     alert("Please enter new Doctors ID")
        //   }


    }
    return (
            <View style={{ flex: 1, justifyContent: 'center' }}>

                <View style={styles.container}>
                    <Ionicons onPress={() => { nav.goBack(); }} name="arrow-back" size={24} color="black" />
                    <Text style={styles.header}>Edit Patient</Text>
                    <View style={styles.regforms}>

                        {/* <Text style={styles.header}>Register</Text> */}
                        <TextInput style={styles.textinput} placeholder="Date of Admission"
                            onChangeText={val => onChangeText('dob', val)}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput style={styles.textinput} placeholder="Patients No"
                            onChangeText={val => onChangeText('patientno', val)}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput style={styles.textinput} placeholder="Name"
                            onChangeText={val => onChangeText('name', val)}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput style={styles.textinput} placeholder="Gender"
                            onChangeText={val => onChangeText('gender', val)}
                            underlineColorAndroid={'transparent'}
                        />
                        <RNPickerSelect onValueChange={(value) => { Change(value) }} items={option} />
                        <TextInput style={styles.textinput} placeholder="Age"
                            underlineColorAndroid={'transparent'}
                            onChangeText={val => onChangeText('age', val)}
                        />
                        <TextInput style={styles.textinput} placeholder="Reg No"
                            underlineColorAndroid={'transparent'}
                            onChangeText={val => onChangeText('regno', val)}
                        /><TextInput style={styles.textinput} placeholder="Disease"
                            underlineColorAndroid={'transparent'}
                            onChangeText={val => onChangeText('disease', val)}
                        />
                        <TextInput style={styles.textinput} placeholder="E-mail"
                            underlineColorAndroid={'transparent'}
                            onChangeText={val => onChangeText('email', val)}
                        />
                        <TextInput style={styles.textinput} placeholder="Passcode"
                            secureTextEntry={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={val => onChangeText('password', val)}
                        />

                        <TouchableOpacity style={styles.button}
                            onPress={submit}
                        >
                            <Text style={styles.btntext}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View >
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#dae3f3',
        padding: 20
    },
    header: {
        fontSize: 24,
        color: 'black',
        marginBottom: 40,
        fontWeight: 'bold',
        alignSelf: 'center'
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


})
export default EditPatient;