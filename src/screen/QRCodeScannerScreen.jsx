import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

const QRCodeScannerScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync("token");
                if (storedToken) {
                    const decodedToken = jwtDecode(storedToken);
                    setToken(storedToken);
                } else {
                    navigation.navigate("Login");
                }
            } catch (err) {
                Alert.alert("Error", "Something went wrong with token.");
                console.error(err);
            }
        };

        loadToken();
    }, []);

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();

            const formData = new FormData();
            formData.append('image', {
                uri: photo.uri,
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
                Alert.alert('Success', 'Photo uploaded!');
            } catch (error) {
                console.error('Upload failed:', error);
                Alert.alert('Error', 'Upload failed.');
            }
        }
    };

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera ref={cameraRef} style={{ flex: 1 }} />
            <Button title="Snap Photo & Upload" onPress={takePhoto} />
        </View>
    );
};

export default QRCodeScannerScreen;
