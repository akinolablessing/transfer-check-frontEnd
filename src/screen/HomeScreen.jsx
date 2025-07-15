import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {colors} from "../utils/colors";
import {fonts} from "../utils/fonts";
import {useNavigation} from "@react-navigation/native";


const HomeScreen = ()=>{
    const navigation = useNavigation();
    const handleLogin =()=>{
        navigation.navigate("LOGIN")
    }
    const handleSignup =()=>{
        navigation.navigate("SIGNUP")
    }
    return(
    <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo}/>
        <Image source={require("../assets/man.png")} style={styles.bannerImage}/>
        <Text style={styles.title}>TransferCheck Scan System</Text>
        <Text style={styles.subTitle}>We scan every transaction in real time
            to make sure it's safe  using smart checks based on
            how, where, and what you're sending.</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButtonWrapper}
              onPress={handleLogin}
            >
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButtonWrapper} onPress={handleSignup}>
                <Text style={styles.signUpButtonText}>Sign-up</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
    },
    logo:{
        height: 40,
        width: 140,
        marginVertical: 30,
    },
    bannerImage:{
        height:250,
        width: 231,
        marginVertical: 20,
    },
    title:{
        fontSize: 40,
        fontFamily: fonts.SemiBold,
        paddingHorizontal: 20,
        textAlign: "center",
        color: colors.primary,
        marginTop: 20,
    },
    subTitle:{
        fontSize: 18,
        textAlign: "center",
        color: colors.secondary,
        fontFamily:fonts.Medium,
        marginVertical: 20,
    },
    buttonContainer:{
        flexDirection:"row",
        marginTop: 20,
        borderWidth: 2,
        borderColor: colors.primary,
        width: "80%",
        height: 60,
        borderRadius: 100,
    },
    loginButtonWrapper:{
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        backgroundColor: colors.accent,
        borderRadius: 90,
    },
    loginButtonText:{
        color: colors.white,
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
    signUpButtonWrapper:{
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        borderRadius: 90,
    },
    signUpButtonText:{
        fontSize: 18,
        fontFamily: fonts.SemiBold,

    }
})