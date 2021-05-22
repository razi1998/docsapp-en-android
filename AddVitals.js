
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

function AddVitals({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const d = selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear();
    // console.log(d)
    setState({
      ...state,
      vital: {
        ...state.vital,
        date: d
      }
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

  console.log(route.params.patientno)
  const nav = useNavigation();
  useEffect(() => {
    axios.get(`http://192.168.0.105:4000/patient/${route.params.patientno}`).then(res => {
      // console.log(res.data)
      const detail1 = res.data.detail.map(data => ({
        "date": data.date,
        "ol": data.ol,
        "bp": data.bp,
        "temp": data.temp,
        "meds": data.meds,
        "remark": data.remark
      }))
      setState({
        ...state,
        detail: detail1,
        dob: res.data.dob,
        email: res.data.email,
        passcode: res.data.passcode,
        name: res.data.name,
        patientno: res.data.patientno,
        disease: res.data.disease,
        regno: res.data.regno,
        gender: res.data.gender,
        age: res.data.age

      })

    })



  }, [])

  const [state, setState] = useState({
    vital: {

      date: "",
      ol: "",
      bp: "",
      temp: "",
      meds: "",
      remark: ""
    },
    detail: [],
    name: "",
    dob: "",
    patientno: "",
    disease: "",
    regno: "",
    gender: "",
    age: "",
    email: "",
    passcode: "",
  })

  const onChangeText = (key, val) => {
    setState({
      ...state,
      vital: {

        ...state.vital,
        [key]: val
      }

    })

  }
  // console.log(route.params.patientno)
  const submit = () => {
    // console.log("State is here ",state.email,state.dob,state.passcode)
    // console.log("vitals:",state.vital)
      if (state.vital.date && state.vital.ol && state.vital.bp && state.vital.temp && state.vital.remark) {
        let data = state.detail.filter(data => data.date !== state.vital.date);
        data.push(state.vital)
        // console.log("Hello",data)
        axios.post(`http://192.168.0.105:4000/patient/${route.params.patientno}`, {
          name: state.name,
          dob: state.dob,
          email: state.email,
          passcode: state.passcode,
          patientno: state.patientno,
          detail: data,
          disease: state.disease,
          regno: state.regno,
          gender: state.gender,
          age: state.age
        })
        // console.log(state.detail)
        alert("Vitals updated successfully")
        navigation.navigate("View all")
      }
      else {
        alert("All fields are required")
      }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>

      <View style={styles.container}>
        <Ionicons onPress={() => { nav.goBack(); }} name="arrow-back" size={24} color="black" />
        <Text style={styles.header}>Add Patients Vitals</Text>
        <View style={styles.regforms}>

          {/* <Text style={styles.header}>Register</Text> */}
          {/* <TextInput style={styles.textinput} placeholder="Date of Obv."
              onChangeText={val => onChangeText('date', val)}
              underlineColorAndroid={'transparent'}/>*/}
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Button onPress={showDatepicker} title="Select date" />
            <Text style={styles.date}>{state.vital.date}</Text>
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
          <TextInput style={styles.textinput} placeholder="Oxygen Level"
            onChangeText={val => onChangeText('ol', val)}
            underlineColorAndroid={'transparent'}
          />
          <TextInput style={styles.textinput} placeholder="Blood Pressure"
            underlineColorAndroid={'transparent'}
            onChangeText={val => onChangeText('bp', val)}
          />
          <TextInput style={styles.textinput} placeholder="Body Temp."
            onChangeText={val => onChangeText('temp', val)}
            underlineColorAndroid={'transparent'}
          />
          <TextInput style={styles.textinput} placeholder="Medicines"
            underlineColorAndroid={'transparent'}
            onChangeText={val => onChangeText('meds', val)}
          />
          <TextInput style={styles.textinput} placeholder="Remarks"
            underlineColorAndroid={'transparent'}
            onChangeText={val => onChangeText('remark', val)}
          />
          <TouchableOpacity style={styles.button}
            onPress={submit}
          >
            <Text style={styles.btntext}>Add</Text>
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
    paddingTop: 40,
    marginTop: 35,
  },
  header: {
    fontSize: 24,
    color: 'black',
    marginBottom: 100,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  date: {
    marginTop: 15,
    marginBottom: 10,
    height: 40,
    color: 'black',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
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
export default AddVitals;