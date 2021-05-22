
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
function RegisterScreen({ navigation }) {
  const nav = useNavigation();
  const [state, setState] = useState({
    name: "",
    specialization: "",
    regno: "",
    degree: "",
    email: "",
    password: "",
    mob: ""
  })
  const [state1, setState1] = useState({
    doctor: []
  })
  useEffect(() => {
    axios.get("http://192.168.0.105:4000/doctor").then(res => {
      const doctors = res.data.map(data => ({
        "regno": data.regno
      }))
      setState1({
        ...state1,
        doctor: doctors
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
    // const data = state1.doctor.find(data => data.regno == state.regno)
    // if (typeof data == 'undefined') {
    //   if (state.name && state.specialzation && state.regno && state.degree && state.email && state.password && state.mob) {
    console.log("this is", state)

    axios.post("http://192.168.0.105:4000/doctor", {
      name: state.name,
      specialization: state.specialization,
      regno: state.regno,
      degree: state.degree,
      email: state.email,
      password: state.password,
      mob: state.mob
    })

    navigation.navigate('Sign in')
    //     }
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
        <Ionicons style={styles.back} onPress={() => { nav.goBack(); }} name="arrow-back" size={24} color="black" />
        <Text style={styles.header}>Register As a Doctor</Text>
        <View style={styles.regforms}>

          <TextInput style={styles.textinput} placeholder="Your Name"
            onChangeText={val => onChangeText('name', val)}
            underlineColorAndroid={'transparent'}
          /><TextInput style={styles.textinput} placeholder="Specialization"
            onChangeText={val => onChangeText('specialization', val)}
            underlineColorAndroid={'transparent'}
          />
          <TextInput style={styles.textinput} placeholder="Reg No"
            underlineColorAndroid={'transparent'}
            onChangeText={val => onChangeText('regno', val)}
          />
          <TextInput style={styles.textinput} placeholder="Degree"
            onChangeText={val => onChangeText('degree', val)}
            underlineColorAndroid={'transparent'}
          />
          <TextInput style={styles.textinput} placeholder="E-mail"
            underlineColorAndroid={'transparent'}
            onChangeText={val => onChangeText('email', val)}
          />
          <TextInput style={styles.textinput} placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid={'transparent'}
            onChangeText={val => onChangeText('password', val)}
          />
          <TextInput style={styles.textinput} placeholder="Mob No"
            underlineColorAndroid={'transparent'}
            onChangeText={val => onChangeText('mob', val)}
          />
          <TouchableOpacity style={styles.button}
            onPress={submit}>
            <Text style={styles.btntext}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:20,alignItems: 'center',justifyContent: 'center' }} title="Signup" onPress={() => navigation.navigate('Sign in')}>
            <Text style={{ color: 'orange', margin: 5, fontWeight: 'bold',}}>&nbsp;Already registered? Login</Text>
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
    padding: 20,
  },
  back: {
    marginRight: 'auto',
    padding: 10,
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
    marginTop: 50
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  },


})
export default RegisterScreen;