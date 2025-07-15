// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { colors } from '../utils/colors'; // Optional
// import { MaterialIcons } from '@expo/vector-icons';
//
// const DashboardScreen = ({ username }) => {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.welcomeText}>Welcome, {username} 🎉</Text>
//             <Text style={styles.subText}>You're now on the TransferCheck dashboard.</Text>
//             <View style={styles.container1}>
//                 {/* Transactions Verified */}
//                 <View style={[styles.card, styles.verifiedCard]}>
//                     <Text style={styles.title}>Transactions Verified</Text>
//                     <View style={styles.row}>
//                         <Text style={styles.count}>2,847</Text>
//                         <MaterialIcons name="check" size={30} color="#0f0f0f" />
//                     </View>
//                     <Text style={styles.positiveChange}>+2.5% from last month</Text>
//                 </View>
//
//                 {/* Fraud Detected */}
//                 <View style={[styles.card, styles.fraudCard]}>
//                     <Text style={styles.title}>Fraud Detected</Text>
//                     <View style={styles.row}>
//                         <Text style={styles.count}>23</Text>
//                         <MaterialIcons name="close" size={30} color="#7f1d1d" />
//                     </View>
//                     <Text style={styles.negativeChange}>-8.2% from last month</Text>
//                 </View>
//             </View>
//         </View>
//
//     );
// };
//
// export default DashboardScreen;
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 20,
//         backgroundColor: colors.white,
//     },
//     welcomeText: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: colors.primary,
//         marginVertical: 70,
//
//     },
//     subText: {
//         fontSize: 16,
//         color: colors.secondary,
//         // marginTop: 10,
//         marginVertical: 70,
//
//     },
//     container1: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 20,
//     },
//     card: {
//         flex: 1,
//         padding: 16,
//         borderRadius: 10,
//         marginRight: 10,
//         elevation: 2,
//     },
//     verifiedCard: {
//         backgroundColor: '#e0f2fe', // light blue
//     },
//     fraudCard: {
//         backgroundColor: '#fee2e2', // light red
//     },
//     title: {
//         fontSize: 14,
//         fontWeight: '600',
//         marginBottom: 8,
//         color: '#334155',
//     },
//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     count: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#0f172a',
//     },
//     positiveChange: {
//         marginTop: 8,
//         color: '#16a34a', // green
//         fontSize: 12,
//     },
//     negativeChange: {
//         marginTop: 8,
//         color: '#b91c1c', // red
//         fontSize: 12,
//     },
// });

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../utils/colors';
import StatCard from '../components/StatCard';
import ActionCard from '../components/ActionCard';
import DashboardTips from "../components/DashboardTips";

const DashboardScreen = ({ username }) => {
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
                    onPress={() => console.log('Scan Receipt')}
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

