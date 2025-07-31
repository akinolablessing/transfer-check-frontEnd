import React, { useState } from 'react';
import {
    View, Text, Button, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import * as ImageManipulator from 'expo-image-manipulator';

export default function QRCodeScannerScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchWithRetry = async (url, options, retries = 1, timeout = 15000) => {
        try {
            console.log(`Attempting fetch (timeout ${timeout}ms)...`);
            return await Promise.race([
                fetch(url, options),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Request timed out')), timeout)
                )
            ]);
        } catch (err) {
            if (retries > 0) {
                console.log("Request failed, retrying with longer timeout...");
                Alert.alert("Waking up server...", "Please wait, the server is starting.");
                return fetchWithRetry(url, options, retries - 1, 70000);
            }
            throw err;
        }
    };

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Please allow access to camera');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.6,
        });

        if (!result.canceled) {
            const compressed = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 1000 } }],
                { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
            );
            setImage(compressed.uri);
        }
    };

    const handleSubmit = async () => {
        if (!image) {
            Alert.alert('Missing Image', 'Please upload a photo.');
            return;
        }

        setIsLoading(true);
        console.log("Preparing to upload image:", image);

        try {
            const token = await SecureStore.getItemAsync('token');
            if (!token) {
                setIsLoading(false);
                Alert.alert('Error', 'No token found. Please login again.');
                navigation.navigate("LOGIN");
                return;
            }

            const formData = new FormData();
            formData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: 'receipt.jpg',
            });

            console.log("Calling backend...");

            const response = await fetchWithRetry(
                "https://transfer-check-backend.onrender.com/api/submit/image",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData
                },
                1,
                15000
            );

            const data = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                navigation.navigate("MoneyAvailable", { status: "failed" });
            } else {
                setImage(null);
                navigation.navigate("MoneyAvailable", { status: "success" });
            }

        } catch (error) {
            console.error("Upload Error:", error);
            setIsLoading(false);
            Alert.alert('Error', error.message || 'Upload failed.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <Button title="Take Photo" onPress={takePhoto} />
            </View>

            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

            <TouchableOpacity
                style={[styles.submitButton, isLoading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={isLoading}
            >
                {isLoading
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.submitText}>Submit Image for Check</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    buttonRow: { flexDirection: 'row', marginBottom: 15 },
    imagePreview: { width: '100%', height: 200, marginBottom: 15, borderRadius: 5 },
    submitButton: { backgroundColor: 'orangered', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 6 },
    disabledButton: { opacity: 0.6 },
    submitText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
