import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function ViewAllPatient({ navigation, route }) {
  const nav = useNavigation();
  const [state, setState] = useState({
    patient: []
  })
  useEffect(() => {
    axios.get(`http://192.168.0.105:4000/patient/${route.params.patientno}`).then(res => {
      setState({
        ...state,
        patient: res.data.detail
      })
    })
  }, [])
  console.log(state)
  return (
    <ScrollView>
      <View style={styles.container}>
        <Ionicons onPress={() => { nav.goBack(); }} name="arrow-back" size={24} color="black" />
        <Text style={styles.header}>{route.params.name}'s All Vitals</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title >Date</DataTable.Title>
            <DataTable.Title numeric>O2 level</DataTable.Title>
            <DataTable.Title numeric>BP</DataTable.Title>
            <DataTable.Title numeric>B.Temp</DataTable.Title>
            <DataTable.Title numeric>Remark</DataTable.Title>
          </DataTable.Header>

          {state.patient.map(data =>
            <DataTable.Row>
              <DataTable.Cell >{data.date}</DataTable.Cell>
              <DataTable.Cell numeric>{data.ol}</DataTable.Cell>
              <DataTable.Cell numeric>{data.bp}</DataTable.Cell>
              <DataTable.Cell numeric>{data.temp}</DataTable.Cell>
              <DataTable.Cell numeric>{data.remark}</DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>
      </View>
    </ScrollView>
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
})

export default ViewAllPatient