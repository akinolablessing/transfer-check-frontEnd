import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";


const MoneyAvailable = ({ route }) => {
    const navigation = useNavigation();
    const status = route?.params?.status || "success";

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate("DASHBOARD");
        }, 10000);
        return () => clearTimeout(timeout);
    }, []);

    const isSuccess = status === "success";

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Ionicons
                    name={isSuccess ? "checkmark-circle" : "close-circle"}
                    size={100}
                    color={isSuccess ? "green" : "red"}
                />
                <Text style={[styles.text, { color: isSuccess ? "green" : "red" }]}>
                    {isSuccess ? "Money Available!" : "Money is not available"}
                </Text>
            </View>
        </View>
    );
};

export default MoneyAvailable;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
    },
    text: {
        marginTop: 20,
        fontSize: 20,
        fontFamily: fonts.Bold,
    },
});
