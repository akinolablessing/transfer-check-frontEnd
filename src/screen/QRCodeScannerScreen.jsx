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

    
    const fetchWithRetry = async (url, options, retries = 1, timeout = 15000) => {
        try {
            console.log(`Attempting upload (timeout: ${timeout}ms)...`);
            return await Promise.race([
                fetch(url, options),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeout))
            ]);
        } catch (err) {
            if (retries > 0) {
                console.log("Request failed, retrying with extended timeout...");
                Alert.alert("Waking up server...", "Please wait, the server is starting.");
                return fetchWithRetry(url, options, retries - 1, 60000);
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
        const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 });
        if (!result.canceled) setImage(result.assets[0].uri);
    };


    const detectReceipt = async (imageUri) => {
        try {
            const result = await MlkitOcr.detectFromFile(imageUri);
            if (!result || result.length === 0) return false;
            const text = result.map(block => block.text).join(' ').toLowerCase();
            const keywords = ['amount', 'transaction', 'ref', 'bank', 'account', 'paid'];
            return keywords.some(k => text.includes(k));
        } catch (err) {
            console.log("OCR error:", err);
            return false;
        }
    };


    const handleSubmit = async () => {
        if (!image) {
            Alert.alert('Missing Image', 'Please upload a photo.');
            return;
        }

        setIsLoading(true);
        console.log("Preparing to upload:", image);

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
            formData.append('image', { uri: image, type: 'image/jpeg', name: 'photo.jpg' });

            const response = await fetchWithRetry(
                "https://transfer-check-backend.onrender.com/submit/image",
                { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData },
                1
            );

            const data = await response.json();
            console.log("Server Response:", data);
            setIsLoading(false);

            if (!response.ok) {
                Alert.alert('Upload Failed', data?.detail || 'Something went wrong');
            } else {
                Alert.alert('Success', 'Your image has been uploaded successfully');
                setImage(null);
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
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Submit Image for Check</Text>}
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
