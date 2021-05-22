import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';


function DocHome({ navigation,route }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 1 }}>
            <Text style={styles.dtxt}>Hello Dr. {route.params.name} </Text>
            <TouchableOpacity style={styles.signout}>
                <SimpleLineIcons onPress={() => navigation.navigate('Sign in')} name="logout" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.container}>
                <TouchableOpacity style={{ marginBottom: 10, padding: 10, paddingBottom: 10 }}
                    onPress={() => navigation.navigate('Add New Patient')}>
                    <LinearGradient colors={['#E9EEF8', '#C3D2EC', '#ABC0E4']} style={styles.button}>
                        <FontAwesome name="user-plus" size={24} color="black" />
                        <Text style={styles.btntxt}>Add New Patients</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginBottom: 10, padding: 10, paddingBottom: 10 }}
                    onPress={() => navigation.navigate('View all')}>
                    <LinearGradient colors={['#E9EEF8', '#C3D2EC', '#ABC0E4']} style={styles.button}>
                        <Entypo name="magnifying-glass" size={24} color="black" />
                        <Text style={styles.btntxt}>View All Patients</Text>
                    </LinearGradient>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ marginBottom: 10, padding: 10, paddingBottom: 10 }}>
                    onPress={() => navigation.navigate('Add Vitals')}>
                    <LinearGradient colors={['#E9EEF8', '#C3D2EC', '#ABC0E4']} style={styles.button}>
                        <FontAwesome name="users" size={24} color="black" />
                        <Text style={styles.btntxt}>Add New Patients Vitals</Text>
                    </LinearGradient>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 60,
        paddingRight: 60,
        backgroundColor: '#dae3f3'
    },
    header: {
        fontSize: 24,
        color: 'black',
        marginBottom: 40,
        fontWeight: 'bold'
    },
    signout: {
        marginLeft: 'auto',
        padding: 10,
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
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    btntxt: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5,
    },
    dtxt: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5,
        marginTop: 50,
        alignSelf: 'center'
    },
})
export default DocHome