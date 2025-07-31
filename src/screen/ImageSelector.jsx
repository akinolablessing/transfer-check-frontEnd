import React, { useState } from 'react';
import {
    View,
    Button,
    Image,
    Text,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const ImageSelector = () => {
    const [imageUri, setImageUri] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const fetchWithRetry = async (url, options, retries = 1, timeout = 15000) => {
        try {
            return await Promise.race([
                fetch(url, options),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Request timed out')), timeout)
                )
            ]);
        } catch (err) {
            if (retries > 0) {
                Alert.alert("Waking up server...", "Please wait, the server is starting.");
                return fetchWithRetry(url, options, retries - 1, 70000);
            }
            throw err;
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Please allow access to your photo library.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
        }
    };

    const uploadImage = async () => {
        if (!imageUri) {
            Alert.alert('Missing Image', 'Please upload a photo.');
            return;
        }

        setIsLoading(true);

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
                uri: imageUri,
                type: 'image/jpeg',
                name: 'receipt.jpg',
            });

            const response = await fetchWithRetry(
                "https://transfer-check-backend.onrender.com/api/submit/image",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                navigation.navigate("MoneyAvailable", { status: "failed" });
            } else {
                setImageUri(null);
                navigation.navigate("MoneyAvailable", { status: "success" });
            }

        } catch (error) {
            console.error("Upload Error:", error);
            setIsLoading(false);
            Alert.alert('Upload Failed', error.message || 'An error occurred while uploading.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Choose from Gallery" onPress={pickImage} />

            {imageUri && (
                <>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                </>
            )}

            <TouchableOpacity
                style={[styles.submitButton, isLoading && styles.disabledButton]}
                onPress={uploadImage}
                disabled={isLoading}
            >
                {isLoading
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.submitText}>Submit Image for Check</Text>
                }
            </TouchableOpacity>
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 10,
    },
    uriText: {
        marginVertical: 10,
        fontSize: 12,
        color: 'gray',
    },
    submitButton: {
        backgroundColor: 'orangered',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginTop: 20,
    },
    disabledButton: {
        opacity: 0.6,
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
