import { Camera } from 'expo-camera';
import React, { useRef, useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import * as SecureStore from "expo-secure-store";

const QRCodeScannerScreen = () => {
    console.log(Camera)
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({ base64: true });
            sendToBackend(photo);
        }
    };

    const sendToBackend = async (photo) => {
        const formData = new FormData();
        formData.append('file', {
            uri: photo.uri,
            name: 'receipt.jpg',
            type: 'image/jpeg',
        });

        try {
            const token = await SecureStore.getItemAsync("token");

            const res = await fetch('https://transfer-check-backend.onrender.com/api/submit/image', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await res.json();
            console.log('Response:', data);
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "Failed to send image");
        }
    };

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera ref={cameraRef} style={{ flex: 1 }} />
            <Button title="Snap & Send" onPress={takePhoto} />
        </View>
    );
};

export default QRCodeScannerScreen;
