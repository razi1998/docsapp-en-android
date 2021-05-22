import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// add this after other import statements
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons';
import DoctorPortal from './DoctorPortal'
import PatientPortal from './PatientPortal'

const Tab = createMaterialBottomTabNavigator()

function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="DoctorPortal"
        activeColor="white"
        inactiveColor="#203864"
        labelStyle={{ fontSize: 15,fontWeight: "bold" }}
      >
        <Tab.Screen
          name="DoctorPortal"
          component={DoctorPortal}
          options={{
            tabBarLabel: 'Doctors',
            tabBarIcon: () => (
              <FontAwesome5 name="user-md" size={25} color="#203864" />
            ),
          }}
        />
        <Tab.Screen
          name='PatientPortal'
          component={PatientPortal}
          options={{
            tabBarLabel: 'Patients',
            tabBarIcon: () => (
              <FontAwesome5 name="user-injured" size={25} color="#203864" />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App