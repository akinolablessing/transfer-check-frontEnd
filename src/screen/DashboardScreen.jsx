

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../utils/colors';
import StatCard from '../components/StatCard';
import ActionCard from '../components/ActionCard';
import DashboardTips from "../components/DashboardTips";
import {useNavigation} from "@react-navigation/native";

const DashboardScreen = ({ username }) => {
    const navigation = useNavigation();

    const handleScanning =()=>{
        navigation.navigate("QRCODESCANNER")
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.welcome}>Welcome, {username} 🎉</Text>
            <Text style={styles.subtitle}>Monitor and verify transactions to protect against fraud.</Text>

            <View style={styles.statsRow}>
                <StatCard
                    title="Transactions Verified"
                    value="2,847"
                    icon="check"
                    iconColor="#0f0f0f"
                    bgColor="#e0f2fe"
                    borderColor="#38bdf8"
                    changeText="+12.5% from last month"
                    changeColor="#16a34a"
                />
                <StatCard
                    title="Fraud Detected"
                    value="23"
                    icon="close"
                    iconColor="#7f1d1d"
                    bgColor="#fee2e2"
                    borderColor="#f87171"
                    changeText="-8.2% from last month"
                    changeColor="#b91c1c"
                />
            </View>

            <View style={styles.actionsRow}>

                <ActionCard
                    icon="photo-camera"
                    title="Scan Receipt"
                    subtitle="Upload and analyze payment receipts"
                    onPress={handleScanning}  />
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
});

