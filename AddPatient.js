
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,Button, Picker } from 'react-native';
import React, { useState, useEffect } from "react";
import axios from "axios";
// import RNPickerSelect from "react-native-picker-select";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
function AddPatient({ navigation,route }) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const d = selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear();
        console.log(d)
        setState({
            ...state,
            dob:d
        })
        const currentDate = selectedDate || date;

        setShow(Platform.OS === 'ios');
        setDate(currentDate);

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    const nav = useNavigation();
    const [state, setState] = useState({
        name: "",
        dob: "",
        disease: "",
        patientno: "",
        detail: [],
        regno:"",
        gender: "",
        age: "",
        email: "",
        passcode: "",
    })
    const [state1, setState1] = useState({
        ids: [],
    })

    const onChangeText = (key, val) => {
        setState({
            ...state,
            [key]: val
        })

    }

    const submit = () => {
        console.log(state)
        if (state.name && state.dob && state.patientno && state.disease && state.regno && state.age) {
            axios.post("http://192.168.0.105:4000/patient", {
                name: state.name,
                dob: state.dob,
                disease: state.disease,
                regno: state.regno,
                detail: state.detail,
                patientno: state.patientno,
                gender: state.gender,
                age: state.age,
                email: state.email,
                passcode: state.passcode,
            })
            
            alert("Patient added successfully.")
            navigation.navigate("Doctor Home")
        }
        else {
            alert("All fields are required")
        }

    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center' }}>

                <View style={styles.container}>
                    <View style={styles.regforms}>
                        <Ionicons styles={styles.back} onPress={() => { nav.goBack(); }} name="arrow-back" size={24} color="black" />
                        <Text style={styles.header}>New Patient</Text>
                        {/* <TextInput style={styles.textinput} placeholder="Date of Admission"
                            onChangeText={val => onChangeText('dob', val)}
                            underlineColorAndroid={'transparent'}
                        /> */}
                        <View style={{marginTop:20}}>
                            <Button onPress={showDatepicker} title="Select date" />
                            <Text style={styles.date}>{state.dob}</Text>
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                        <TextInput style={styles.textinput} placeholder="Patients No"
                            onChangeText={val => onChangeText('patientno', val)}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput style={styles.textinput} placeholder="Name"
                            onChangeText={val => onChangeText('name', val)}
                            underlineColorAndroid={'transparent'}
                        />
                        <TextInput style={styles.textinput} placeholder="Age"
                            underlineColorAndroid={'transparent'}
                            onChangeText={val => onChangeText('age', val)}
                        />
                        <TextInput style={styles.textinput} placeholder="Gender"
                            underlineColorAndroid={'transparent'}
                            onChangeText={val => onChangeText('gender', val)}
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
                            onChangeText={val => onChangeText('passcode', val)}
                        />

                        <TouchableOpacity style={styles.button}
                            onPress={submit}
                        >
                            <Text style={styles.btntext}>Add New Patient</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#dae3f3',
        padding: 20,
        paddingTop: 40,
        marginTop: 35,
    },
    back: {
        marginRight: 'auto',
        padding: 10,

    },
    date: {
        marginTop: 5,
        height: 40,
        color: 'black',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
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
        padding: 20,
        backgroundColor: '#203864',
        marginTop: 50,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',

    },


})
export default AddPatient;