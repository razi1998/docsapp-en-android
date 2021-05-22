
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './RegisterScreen'

function LoginScreen({ navigation }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onChangeText = (key, val) => {
    setState({
      ...state,
      [key]: val
    })

  }

  const submit = () => {

    axios.get("http://192.168.0.105:4000/doctor").then(res => {

      //console.log(res.data)
      let e = true

      if (state.email && state.password) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email == state.email) {

            if (res.data[i].password == state.password) {
              //console.log(res.data[i].email, res.data[i].password, state.email, state.password)
              e = false

              alert("Sucessfully Logged in!")

              navigation.navigate("Doctor Home", { name: res.data[i].name })
            }

          }
        }
        if (e == true) {
          alert("Invalid email or password")

        }
      }
      else {
        if (state.email) {
          alert("Please enter password")
        }
        else {
          alert("Please enter the email")
        }
      }

    })
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={styles.regforms}>
          <Text style={styles.header}>Doctors Log in</Text>
          <TextInput style={styles.textinput} placeholder="E-mail"
            underlineColorAndroid={'transparent'}
            onChangeText={val => onChangeText('email', val)}
          />
          <TextInput style={styles.textinput} placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid={'transparent'}
            onChangeText={val => onChangeText('password', val)}
          />
          {/* <TouchableOpacity title="Doctor Home" onPress={() => navigation.navigate('Change Password')}>
            <Text style={{ color: 'orange', margin: 5 ,}}>&nbsp;Change Password?</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.button}
            onPress={submit}>
            {/* onPress={(submit)=>
            navigation.navigate('Doctor Home')}> */}
            <Text style={styles.btntext}>Sign In</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 20, color: 'orange', margin: 5 }}>&nbsp;Are you a doctor?</Text>
          <Text style={{ color: 'orange', margin: 5 }}>&nbsp;Didn’t have account?</Text>
          <TouchableOpacity title="Signup" onPress={() => navigation.navigate('Register as a Doctor')}>
            <Text style={{ color: 'orange', margin: 5, fontWeight: 'bold', }}>&nbsp;Create Account now</Text>
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
    padding: 30
  },

  header: {
    fontSize: 24,
    color: 'black',
    marginBottom: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 2
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
export default LoginScreen;