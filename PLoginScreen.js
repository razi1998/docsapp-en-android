import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function PLoginScreen({ navigation }) {
  const [state, setState] = useState({
    email: "",
    passcode: "",
  });

  const onChangeText = (key, val) => {
    setState({
      ...state,
      [key]: val
    })

  }

  const submit = () => {

    axios.get("http://192.168.0.105:4000/patient").then(res => {

      // users=res.data
      console.log("reg data is==", res.data[0].regno)
      //history.push("/home"); 
      console.log(res.data)
      let e = true

      if (state.email && state.passcode) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email == state.email) {

            if (res.data[i].passcode == state.passcode) {
              console.log(res.data[i].email, res.data[i].passcode, state.email, state.passcode)
              e = false

              alert("Sucessfully Logged in!")

              navigation.navigate('PatientScreen', { patientno: res.data[i].patientno, name: res.data[i].name })
            }

          }
        }
        if (e == true) {
          alert("Invalid email or passcode")

        }
      }


    })


  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>


      <View style={styles.container}>
        <View style={styles.regforms}>
          <Text style={styles.header}>Patients Log in</Text>

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
            onPress={submit}>
            {/* onPress={() => navigation.navigate('PatientScreen')}> */}
            <Text style={styles.btntext}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#dae3f3',
    padding: 30,
  },

  header: {
    fontSize: 24,
    color: 'black',
    marginBottom: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    borderBottomColor:'black',
    borderBottomWidth:2
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
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#203864',
    marginTop: 30
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',

  },


})
export default PLoginScreen;