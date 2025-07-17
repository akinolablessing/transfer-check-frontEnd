import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../utils/colors';
import StatCard from '../components/StatCard';
import ActionCard from '../components/ActionCard';
import DashboardTips from "../components/DashboardTips";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [decoded, setDecoded] = useState(null);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [successFullTransaction, setSuccessFullTransactions] = useState(0);
    const [unsuccessFullTransaction, setUnsuccessFullTransactions] = useState(0);
    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await SecureStore.getItemAsync("token");
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setDecoded(decodedToken);
                    setToken(token);
                    await fetchSuccessfulTransactions(token);
                    await fetchUnsuccessfulTransactions(token);
                } else {
                    navigation.navigate("Login");
                }
            } catch (err) {
                alert("Something went wrong!");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadToken();
    }, []);

    const fetchSuccessfulTransactions = async (token) => {
        try {
            const response = await fetch("https://transfer-check-backend.onrender.com/api/successfulTransactions", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            setSuccessFullTransactions(data || 0);
        } catch (err) {
            alert("Something went wrong while fetching transactions!");
            console.log(err);
        }
    };

    const fetchUnsuccessfulTransactions = async (token) => {
        try {
            const response = await fetch("https://transfer-check-backend.onrender.com/api/unsuccessfulTransactions", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            setUnsuccessFullTransactions(data || 0);
        } catch (err) {
            alert("Something went wrong while fetching transactions!");
            console.log(err);
        }
    };

    const handleScanning = () => {
        console.log("Navigate to QR code scanner");
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text>Loading dashboard...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.welcome}>
                Welcome, {decoded?.name || "User"} 🎉
            </Text>
            <Text style={styles.subtitle}>
                Monitor and verify transactions to protect against fraud.
            </Text>

            <View style={styles.statsRow}>
                <StatCard
                    title="Transactions Verified"
                    value={successFullTransaction === 0
                        ? "You don't have any transactions yet."
                        : "Monitor and verify transactions to protect against fraud."}
                    icon="check"
                    iconColor="#0f0f0f"
                    bgColor="#e0f2fe"
                    borderColor="#38bdf8"
                    changeText={successFullTransaction === 0 ? null :"+12.5% from last month"}
                    changeColor="#16a34a"
                />
                <StatCard
                    title="Fraud Detected"
                    value={unsuccessFullTransaction === 0
                        ? "You don't have any transactions yet."
                        : "Monitor and verify transactions to protect against fraud."}
                    icon="close"
                    iconColor="#7f1d1d"
                    bgColor="#fee2e2"
                    borderColor="#f87171"
                    changeText={unsuccessFullTransaction === 0 ? null :"+12.5% from last month"}
                    changeColor="#b91c1c"
                />
            </View>

            <View style={styles.actionsRow}>
                <ActionCard
                    icon="photo-camera"
                    title="Scan Receipt"
                    subtitle="Upload and analyze payment receipts"
                    onPress={handleScanning}
                />
                <ActionCard
                    icon="admin-panel-settings"
                    title="View Admin Panel"
                    subtitle="Monitor flagged transactions"
                    onPress={() => console.log('View Admin Panel')}
                />
            </View>

            <View style={styles.section}>
                <DashboardTips />
            </View>
        </ScrollView>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: colors.secondary,
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    actionsRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    section: {
        marginBottom: 40,
    },
});
