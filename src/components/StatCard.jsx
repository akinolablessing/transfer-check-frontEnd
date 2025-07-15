import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StatCard = ({ title, value, icon, iconColor, bgColor, borderColor, changeText, changeColor }) => {
    return (
        <View style={[styles.card, { backgroundColor: bgColor, borderColor }]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.row}>
                <Text style={styles.count}>{value}</Text>
                <MaterialIcons name={icon} size={30} color={iconColor} />
            </View>
            <Text style={[styles.change, { color: changeColor }]}>{changeText}</Text>
        </View>
    );
};

export default StatCard;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 16,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: '#334155',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    count: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    change: {
        marginTop: 8,
        fontSize: 12,
    },
});
