import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate("LOGIN");
    };

    const handleSignup = () => {
        navigation.navigate("SIGNUP");
    };

    return (
        <View style={styles.container}>
            {/* Logo with fadeInDown */}
            <Animatable.Image
                animation="fadeInDown"
                duration={1200}
                source={require("../assets/img.png")}
                style={styles.logo}
            />

            {/* Banner Image with zoomIn */}
            <Animatable.Image
                animation="zoomIn"
                delay={500}
                duration={1000}
                source={require("../assets/man.png")}
                style={styles.bannerImage}
            />

            {/* Title with bounceIn */}
            <Animatable.Text
                animation="bounceIn"
                delay={1000}
                style={styles.title}
            >
                TransferCheck Scan System
            </Animatable.Text>

            {/* Subtitle with fadeIn */}
            <Animatable.Text
                animation="fadeIn"
                delay={1300}
                style={styles.subTitle}
            >
                We scan every transaction in real time
                to make sure it's safe using smart checks based on
                how, where, and what you're sending.
            </Animatable.Text>

            {/* Buttons with slideInUp */}
            <Animatable.View
                animation="slideInUp"
                delay={1500}
                style={styles.buttonContainer}
            >
                <TouchableOpacity
                    style={styles.loginButtonWrapper}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signUpButtonWrapper}
                    onPress={handleSignup}
                >
                    <Text style={styles.signUpButtonText}>Sign-up</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 100,
        backgroundColor: colors.white,
        alignItems: "center",
    },
    logo: {
        height: 40,
        width: 290,
        marginVertical: 30,
    },
    bannerImage: {
        height: 250,
        width: 231,
        marginVertical: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: fonts.SemiBold,
        textAlign: "center",
        color: colors.primary,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    subTitle: {
        fontSize: 16,
        textAlign: "center",
        color: colors.secondary,
        fontFamily: fonts.Medium,
        marginVertical: 20,
        paddingHorizontal: 30,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        borderWidth: 2,
        borderColor: colors.primary,
        width: "80%",
        height: 60,
        borderRadius: 100,
    },
    loginButtonWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        backgroundColor: colors.accent,
        borderRadius: 90,
    },
    loginButtonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
    signUpButtonWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        borderRadius: 90,
    },
    signUpButtonText: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
});
