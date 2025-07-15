import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardTips = () => {
    const tips = [
        {
            emoji: '🔐',
            message: 'Remember: Always verify customer identity before releasing funds. Stay alert, stay secure!',
        },
        {
            emoji: '💡',
            message: 'Tip: Use the scan feature regularly to reduce fraud risks and flag suspicious patterns in real-time.',
        },
        {
            emoji: '🛡️',
            message: 'TransferCheck is committed to helping you verify every transaction and prevent fraud before it happens.',
        },
        {
            emoji: '🚀',
            message: "You're doing great! Continue protecting your customers with smart, secure verifications.",
        },
        {
            emoji: '🧭',
            message: 'Not sure what to do next? Start by scanning a new receipt or reviewing your recent transactions.',
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Helpful Tips & Reminders</Text>
            {tips.map((tip, index) => (
                <View key={index} style={styles.tipBox}>
                    <Text style={styles.tipText}>
                        {tip.emoji} {tip.message}
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default DashboardTips;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#1C1F26',
    },
    tipBox: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#60A5FA',
    },
    tipText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },
});
