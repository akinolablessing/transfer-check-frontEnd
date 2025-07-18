import React, {useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import {colors} from "../utils/colors";
import {fonts} from "../utils/fonts";
import {useNavigation} from "@react-navigation/native";

const SignupScreen =({ setUsername })=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigation = useNavigation();
    const [secureEntry, setSecureEntry] = useState(true);
    const handleGoBack = ()=>{
        navigation.goBack();
    };
    const handleLogin =()=>{
        navigation.navigate("LOGIN");
    };
    const handleSubmit = () => {
        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || phone.trim() === '') {
            setErrorMessage('All fields are required. and space are  not allowed.');
            return;
        }

        setUsername(name);
        signup();
    };
    const signup = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name:name,
                    email: email,
                    password: password,
                    phone:phone,
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Signup success:", data);
                alert("Signup success!");
                navigation.navigate("DASHBOARD");
            } else {
                setErrorMessage(data.detail);
            }
        } catch (error) {
            console.error("Signup error:", error);
            setErrorMessage(error);
        }
    };


            return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
                <Ionicons name={"arrow-back-outline"}
                          color={colors.primary}
                          size={25}
                />

            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Let's get</Text>
                <Text style={styles.headingText}>started.</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name={"rename-outline"}
                              size={30}
                              color={colors.secondary}/>
                    <TextInput style={styles.textInput}
                               placeholder="Enter your username."
                               placeholderTextColor={colors.secondary}
                               keyboardType="name-phone-pad"
                               onChangeText={(text) => {
                                   setName(text);
                                   setErrorMessage('');
                               }}
                               value={name}

                    />
                </View>
                <View style={styles.inputContainer}>
                    <AntDesign name={"phone"}
                              size={30}
                              color={colors.secondary}/>
                    <TextInput style={styles.textInput}
                               placeholder="Enter your phoneNumber."
                               placeholderTextColor={colors.secondary}
                               keyboardType="number-pad"
                               onChangeText={(text) => {
                                   setPhone(text);
                                   setErrorMessage('');
                               }}
                               value={phone}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name={"mail-outline"}
                              size={30}
                              color={colors.secondary}/>
                    <TextInput style={styles.textInput}
                               placeholder="Enter your email."
                               placeholderTextColor={colors.secondary}
                               keyboardType="email-address"
                               onChangeText={(text) => {
                                   setEmail(text);
                                   setErrorMessage('');
                               }}
                               value={email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <SimpleLineIcons name={"lock"}
                                     size={30}
                                     color={colors.secondary}/>
                    <TextInput style={styles.textInput}
                               placeholder="Enter your password."
                               placeholderTextColor={colors.secondary}
                               secureTextEntry={secureEntry}
                               value={password}
                               onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={()=>{
                            setSecureEntry((prev) =>!prev);
                        }}>
                        <SimpleLineIcons name={"eye"}
                                         size={20}
                                         color={colors.secondary}


                        />
                    </TouchableOpacity>
                </View>
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                {/*<TouchableOpacity>*/}
                {/*    /!*<Text style={styles.forgotPasswordText}>Forgot Password?</Text>*!/*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSubmit}>
                    <Text style={styles.loginText}>Sign up</Text>
                </TouchableOpacity>
                <Text style={styles.continueText}>or continue with</Text>
                <TouchableOpacity style={styles.googleButtonContainer}>
                    <Image source={require("../assets/google.png")} style={styles.googleImage}/>
                    <Text style={styles.googleText}>Google</Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.accountText}>Already have an account!</Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.signupText}>Login</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}
export default SignupScreen
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
        padding:20,
    },
    backButtonWrapper:{
        height:40,
        width:40,
        backgroundColor:colors.gray,
        borderRadius:20,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer:{
        marginVertical:20,

    },
    errorText: {
        color: "#FF3B30",
        marginLeft: 10,
        marginTop: -5,
        marginBottom: 5,
        fontSize: 12,
        fontFamily: fonts.Light
    },
    headingText:{
        fontSize:32,
        color: colors.primary,
        fontFamily: fonts.SemiBold,
    },
    formContainer:{
        marginTop: 20,

    },
    inputContainer:{
        borderWidth:1,
        borderColor:colors.secondary,
        borderRadius: 100,
        paddingHorizontal:20,
        flexDirection:"row",
        alignItems:"center",
        padding:2,
        marginVertical:10,
    },
    textInput:{
        flex:1,
        paddingHorizontal:10,
        fontFamily:fonts.Light,
    },
    forgotPasswordText:{
        textAlign: "right",
        color:colors.primary,
        fontFamily: fonts.SemiBold,
        marginVertical:10,

    },
    loginButtonWrapper:{
        backgroundColor:colors.accent,
        borderRadius:100,
        marginTop:20,

    },
    loginText:{
        color:colors.white,
        fontSize: 20,
        fontFamily: fonts.SemiBold,
        textAlign:"center",
        padding:10,

    },
    continueText:{
        textAlign:"center",
        marginVertical:20,
        fontSize:14,
        fontFamily:fonts.Regular,
        color:colors.primary,

    },
    googleButtonContainer:{
        flexDirection: "row",
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 100,
        justifyContent:"center",
        alignItems:"center",
        padding: 10,
        gap:10,

    },
    googleImage:{
        height:20,
        width:20,

    },
    googleText:{
        fontSize: 20,
        fontFamily: fonts.SemiBold,

    },
    footerContainer:{
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        gap: 5,
    },
    accountText:{
        color:colors.primary,
        fontFamily:fonts.Regular,
    },
    signupText:{
        color:colors.primary,
        fontFamily: fonts.Bold,
    }
})