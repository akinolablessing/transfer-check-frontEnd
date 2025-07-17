// screens/LoginSuccessScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";

const LoginSuccessScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate("DASHBOARD");
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Ionicons name="checkmark-circle" size={100} color="green" />
                <Text style={styles.text}>Login Successful!</Text>
            </View>
        </View>
    );
};

export default LoginSuccessScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        fontSize: 20,
        color: 'green',
        fontFamily: fonts.Bold,
    },
});
