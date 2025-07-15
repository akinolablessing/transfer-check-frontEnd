import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ActionCard = ({ icon, title, subtitle, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <MaterialIcons name={icon} size={36} color="#000" />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </TouchableOpacity>
    );
};

export default ActionCard;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        marginRight: 10,
        elevation: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
    },
    subtitle: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 4,
        textAlign: 'center',
    },
});
