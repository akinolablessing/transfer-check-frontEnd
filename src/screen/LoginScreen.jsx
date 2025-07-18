import React, { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSignUp = () => {
        navigation.navigate("SIGNUP");
    };

    const handleDashboard = () => {
        if (email.trim() === '' || password.trim() === '') {
            setErrorMessage('All fields are required.');
            return;
        }
        login();
    };

    const login = async () => {
        if (isLoading) return;

        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch("https://transfer-check-backend.onrender.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,

                })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.access_token) {
                    await SecureStore.setItemAsync("token", data.access_token);
                    navigation.navigate("LoginSuccessFul");
                } else {
                    throw new Error("No access token received");
                }
            } else {
                const errorMsg = data.detail || data.message || "Login failed. Please check your credentials";
                throw new Error(errorMsg);
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage(error.message || "An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
                <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Hey,</Text>
                <Text style={styles.headingText}>Welcome</Text>
                <Text style={styles.headingText}>Back</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your email"
                        placeholderTextColor={colors.secondary}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your password"
                        placeholderTextColor={colors.secondary}
                        secureTextEntry={secureEntry}
                        autoCapitalize="none"
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TouchableOpacity onPress={() => setSecureEntry(prev => !prev)}>
                        <SimpleLineIcons
                            name={secureEntry ? "eye" : "eye-close"}
                            size={20}
                            color={colors.secondary}
                        />
                    </TouchableOpacity>
                </View>

                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.loginButtonWrapper, isLoading && styles.disabledButton]}
                    onPress={handleDashboard}
                    disabled={isLoading}
                >
                    {isLoading && <ActivityIndicator color={colors.white} />? (
                        <Text style={styles.loginText}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Text>
                    ) : (
                        <Text style={styles.loginText}>Login</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.continueText}>or continue with</Text>

                <TouchableOpacity style={styles.googleButtonContainer}>
                    <Image source={require("../assets/google.png")} style={styles.googleImage} />
                    <Text style={styles.googleText}>Google</Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={styles.accountText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.signupText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        marginVertical: 100,
        flex:1,
        backgroundColor: colors.white,
        padding: 20,
    },
    backButtonWrapper: {
        height: 40,
        width: 40,
        backgroundColor: colors.gray,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "#FF3B30",
        marginLeft: 10,
        marginTop: -5,
        marginBottom: 5,
        fontSize: 12,
        fontFamily: fonts.Light
    },
    textContainer: {
        marginVertical: 20,
    },
    headingText: {
        fontSize: 32,
        color: colors.primary,
        fontFamily: fonts.SemiBold,
    },
    formContainer: {
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
        borderColor: colors.accent,
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
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        gap: 5,
    },
    accountText: {
        color: colors.primary,
        fontFamily: fonts.Regular,
    },
    signupText: {
        color: colors.primary,
        fontFamily: fonts.Bold,
    }
});