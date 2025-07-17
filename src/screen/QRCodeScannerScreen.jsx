import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

const QRCodeScannerScreen = () => {
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log("Photo taken:", photo.uri);
        }
    };

    if (hasPermission === null) return <View><Text>Requesting camera permission...</Text></View>;
    if (hasPermission === false) return <View><Text>No access to camera</Text></View>;

    return (
        <View style={styles.container}>
            <Camera ref={cameraRef} style={styles.camera} />
            <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.buttonText}>📷 Take Photo</Text>
            </TouchableOpacity>
        </View>
    );
};

export default QRCodeScannerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
