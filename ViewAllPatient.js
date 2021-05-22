import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Alert, } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


function ViewAllPatient({ navigation }) {
  const nav = useNavigation();
  const [state, setState] = useState({
    patient: []
  })
  useEffect(() => {
    axios.get("http://192.168.0.105:4000/patient").then(res => {
      setState({
        ...state,
        patient: res.data
      })
    })
  },)
  console.log(state)
  return (
      <View style={styles.container}>
        <Ionicons onPress={() => { nav.goBack(); }} name="arrow-back" size={24} color="black" />
        <Text style={styles.header}>All Patients</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Patient Name</DataTable.Title>
            <DataTable.Title numeric>View</DataTable.Title>
            <DataTable.Title numeric>Vitals</DataTable.Title>
            <DataTable.Title numeric>Delete</DataTable.Title>
          </DataTable.Header>

          {state.patient.map(data => {
            return (
              <DataTable.Row>
                <DataTable.Cell>{data.name}</DataTable.Cell>
                <DataTable.Cell numeric><TouchableOpacity onPress={() => navigation.navigate('Vitals', { patientno: data.patientno, name:data.name })}><MaterialCommunityIcons name="account-details" size={24} color="black" /></TouchableOpacity></DataTable.Cell>
                <DataTable.Cell numeric><TouchableOpacity onPress={() => navigation.navigate('Add Vitals', { patientno: data.patientno })}><MaterialIcons name="add-box" size={24} color="black" /></TouchableOpacity></DataTable.Cell>
                <DataTable.Cell numeric><TouchableOpacity onPress={() => navigation.navigate('Delete',{patientno:data.patientno})}><MaterialIcons name="delete" size={24} color="black" /></TouchableOpacity></DataTable.Cell>
              </DataTable.Row>
            )
          })}
        </DataTable>
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dae3f3',
    padding: 20,
    paddingTop: 50,
  },
  viewButton: {
    width: 40,
    backgroundColor: `#006400`
  },
  header: {
    fontSize: 24,
    color: 'black',
    marginBottom: 40,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  delButton: {
    width: 40,
    backgroundColor: `#dc143c`
  },
})

export default ViewAllPatient