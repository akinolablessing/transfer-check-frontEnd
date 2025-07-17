// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
//
// const QRCodeScannerScreen = ({ navigation }) => {
//     const [hasPermission, setHasPermission] = useState(null);
//     const [scanned, setScanned] = useState(false);
//
//     useEffect(() => {
//         const requestPermission = async () => {
//             // const { status } = await BarCodeScanner.requestPermissionsAsync();
//             setHasPermission(status === 'granted');
//         };
//         requestPermission();
//     }, []);
//
//     const handleBarCodeScanned = ({ type, data }) => {
//         setScanned(true);
//         alert(`QR Code scanned: ${data}`);
//         // You can navigate or process the data here
//     };
//
//     if (hasPermission === null) {
//         return <Text>Requesting camera permission...</Text>;
//     }
//
//     if (hasPermission === false) {
//         return <Text>No access to camera</Text>;
//     }
//
//     return (
//         <View style={styles.container}>
//             <BarCodeScanner
//                 onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//                 style={StyleSheet.absoluteFillObject}
//             />
//
//             {scanned && (
//                 <Button title="Scan Again" onPress={() => setScanned(false)} />
//             )}
//         </View>
//     );
// };
//
// export default QRCodeScannerScreen;
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });
