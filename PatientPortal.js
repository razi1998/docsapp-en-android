import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PLoginScreen from './PLoginScreen'
import PatientHome from './PatientHome'
import PatientVitals from './PatientVitals'
import PatientDetails from './PatientDetails';

const Stack = createStackNavigator();
function App() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="PLoginScreen" component={PLoginScreen} />
        <Stack.Screen name="PatientScreen" component={PatientHome}/>
        <Stack.Screen name="View Patient" component={PatientDetails}/>
        <Stack.Screen name="View Patient Vital" component={PatientVitals}/>
      </Stack.Navigator>
  );
}

export default App;