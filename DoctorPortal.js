import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import ChangePass from './ChangePass'
// import PatientScreen from'./PatientScreen'
// import PatientList from './PatientList'
import DocHome from './DocHome'
import AddVitals from './AddVitals'
import AddPatient from './AddPatient'
import ViewAllPatient from './ViewAllPatient'
import PatientDetails from './PatientDetails'
import Delete from './Delete';
import ViewVitals from './ViewVitals'

const Stack = createStackNavigator();
function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sign in" component={LoginScreen} />
      <Stack.Screen name="Change Password" component={ChangePass} />
      <Stack.Screen name="Register as a Doctor" component={RegisterScreen} />
      <Stack.Screen name="Doctor Home" component={DocHome} />
      <Stack.Screen name="Add New Patient" component={AddPatient} />
      <Stack.Screen name="View all" component={ViewAllPatient} />
      <Stack.Screen name="Patient Details" component={PatientDetails} />
      <Stack.Screen name="Add Vitals" component={AddVitals} />
      <Stack.Screen name="Delete" component={Delete} />
      <Stack.Screen name="Vitals" component={ViewVitals} />
    </Stack.Navigator>
  );
}

export default App;