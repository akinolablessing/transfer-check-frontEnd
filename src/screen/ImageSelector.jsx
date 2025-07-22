import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

const ImageSelector = () => {
    const [imageUri, setImageUri] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await SecureStore.getItemAsync("token");
            if (storedToken) {
                setToken(storedToken);
            } else {
                Alert.alert("Not logged in", "No token found.");
            }
        };

        loadToken();
    }, []);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access gallery is required!');
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
            uploadImage(uri);
        }
    };

    const uploadImage = async (uri) => {
        const formData = new FormData();
        formData.append('image', {
            uri: uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await fetch('https://transfer-check-backend.onrender.com/api/submit/image', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const result = await response.json();
            console.log('Upload success:', result);
            Alert.alert('Success', 'Image uploaded!');
        } catch (error) {
            console.error('Upload failed:', error);
            Alert.alert('Error', 'Failed to upload image.');
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick Image from Gallery" onPress={pickImage} />
            {imageUri && (
                <>
                    <Image source={{ uri: imageUri }} style={{ width: 300, height: 300, marginTop: 20 }} />
                    <Text>Photo URI: {imageUri}</Text>
                </>
            )}
        </View>
    );
};

export default ImageSelector;
