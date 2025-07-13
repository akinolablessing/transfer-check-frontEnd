import {StyleSheet, Text, View} from 'react-native'
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./src/screen/HomeScreen";
import LoginScreen from "./src/screen/LoginScreen";


const Stack = createNativeStackNavigator();

const App =()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown:false,
            }}>
                <Stack.Screen name={"HOME"}
                              component={HomeScreen} />
                <Stack.Screen name={"LOGIN"}
                              component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App
const styles = StyleSheet.create({})

















// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.jsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
