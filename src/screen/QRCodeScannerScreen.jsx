import React, { useState } from 'react';
import {
    View, Text, Button, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import MlkitOcr from 'react-native-mlkit-ocr';

export default function QRCodeScannerScreen({ navigation }) {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Helper: fetch with timeout (15s)
    const fetchWithTimeout = (url, options, timeout = 15000) =>
        Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), timeout)
            ),
        ]);

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Please allow access to camera');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const detectReceipt = async (imageUri) => {
        const result = await MlkitOcr.detectFromFile(imageUri);
        const text = result.map(block => block.text).join(' ').toLowerCase();
        const keywords = ['amount', 'transaction', 'ref', 'bank', 'account', 'paid'];
        const isReceipt = keywords.some(keyword => text.includes(keyword));
        return isReceipt;
    };

    const handleSubmit = async () => {
        if (!image) {
            Alert.alert('Missing Image', 'Please upload a photo.');
            return;
        }

        setIsLoading(true);
        Alert.alert("Uploading image:", `${image}`);

        const isReceipt = await detectReceipt(image);
        if (isReceipt) {
            setIsLoading(false);
            Alert.alert('Invalid Image', 'Please upload a valid photo, not a transaction receipt.');
            return;
        }

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
                name: 'photo.jpg',
            });

            const response = await fetchWithTimeout("https://transfer-check-backend.onrender.com/submit/image", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,

                },
                body: formData,
            });

            const data = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                Alert.alert('Upload Failed', data?.detail || 'Something went wrong');
            } else {
                Alert.alert('Image uploaded', 'Your image has been uploaded successfully');
                setImage(null); // Optional: clear the image after success
            }

        } catch (error) {
            console.error(error);
            setIsLoading(false);
            Alert.alert('Error', error.message || 'An error occurred while uploading.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <Button title="Take Photo" onPress={takePhoto} />
            </View>

            {image && (
                <Image source={{ uri: image }} style={styles.imagePreview} />
            )}

            <TouchableOpacity
                style={[styles.submitButton, isLoading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitText}>Submit Image for Check</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 15,
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: 'orangered',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    disabledButton: {
        opacity: 0.6,
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
