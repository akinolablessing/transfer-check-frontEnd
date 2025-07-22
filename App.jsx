import {StyleSheet, Text, View} from 'react-native'
import React, {useState} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./src/screen/HomeScreen";
import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";
import DashboardScreen from "./src/screen/DashboardScreen";
import QRCodeScannerScreen from "./src/screen/QRCodeScannerScreen";
import LoginSuccessScreen from "./src/screen/LoginSuccessFul";
import ImageSelector from "./src/screen/ImageSelector";


const Stack = createNativeStackNavigator();

const App =()=>{
    const [username, setUsername] = useState('');

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown:false,
            }}>
                <Stack.Screen name={"HOME"}
                              component={HomeScreen}
                              />
                <Stack.Screen name={"LOGIN"}
                              component={LoginScreen} />
                <Stack.Screen name="SIGNUP">
                    {(props) => <SignupScreen {...props} setUsername={setUsername} />}
                </Stack.Screen>
                <Stack.Screen name="DASHBOARD">
                    {(props) => <DashboardScreen {...props} username={username} />}
                </Stack.Screen>
                <Stack.Screen name="QRCODESCANNER" component={QRCodeScannerScreen} />
                <Stack.Screen name="LoginSuccessFul" component={LoginSuccessScreen} />
                <Stack.Screen name="ImagePicker" component={ImageSelector} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App
const styles = StyleSheet.create({})




