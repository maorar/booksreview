import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert, Platform,BackHandler } from 'react-native';
import { Text, Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref, uploadBytes, getDownloadURL, connectStorageEmulator } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import app from '../../../firebaseConfig';


// Inicializa Firebase Storage
const storage = getStorage(app);

// Configura el emulador de Storage (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  connectStorageEmulator(storage, '192.168.1.13', 9199); // Conexión al emulador de Storage
}

export default function ProfileScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      // Solicitar permisos de la cámara
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      // Solicitar permisos de la galería
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasMediaLibraryPermission(mediaStatus === 'granted');
    })();
  }, []);

  const handleChoosePhoto = async () => {
    // Verificar permisos de la galería
    if (!hasMediaLibraryPermission) {
      Alert.alert('Permisos necesarios', 'Se requieren permisos para acceder a la galería.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.Images, // Usar ImagePicker.MediaType.Images
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri); // Guardar la URI de la imagen seleccionada
      } else {
        Alert.alert('Error', 'No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
  };

  const handleTakePhoto = async () => {
    // Verificar permisos de la cámara
    if (!hasCameraPermission) {
      Alert.alert('Permisos necesarios', 'Se requieren permisos para acceder a la cámara.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri); // Guardar la URI de la foto tomada
      } else {
        Alert.alert('Error', 'No se tomó ninguna foto.');
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto.');
    }
  };

  const handleUploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'No se ha seleccionado ninguna imagen.');
      return;
    }

    try {
      // Convertir la URI de la imagen a un blob
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Crear una referencia en Firebase Storage
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'Usuario no autenticado.');
        return;
      }

      const storageRef = ref(storage, `profile_images/${user.uid}`);

      // Subir la imagen a Firebase Storage
      await uploadBytes(storageRef, blob);

      // Obtener la URL de descarga de la imagen
      const downloadURL = await getDownloadURL(storageRef);

      // Guardar la URL de la imagen en AsyncStorage (opcional)
      await AsyncStorage.setItem('profileImageUrl', downloadURL);

      Alert.alert('Éxito', 'La imagen se ha subido correctamente.');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Alert.alert('Error', 'No se pudo subir la imagen.');
    }
  };

  const handleLogout = async () => {
    try {
      // Eliminar el token y otros datos de AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('profileImageUrl'); // Si deseas limpiar otros datos
  
      // Cerrar sesión de Firebase
      const auth = getAuth(app);
      await auth.signOut();
  
      // Navegar a la pantalla de inicio de sesión
      //navigation.navigate('Login');
      BackHandler.exitApp();
    } catch (error) {
      alert('Error al cerrar sesión: ' + error.message);
    }
  };
  

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text h4>Perfil</Text>

      {imageUri ? (
        <View style={{ marginVertical: 20 }}>
          <Text>Imagen seleccionada:</Text>
          <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
        </View>
      ) : (
        <Text>No se ha seleccionado ninguna imagen.</Text>
      )}

      <Button title="Elegir imagen de la galería" onPress={handleChoosePhoto} buttonStyle={styles.addButton} />
      <Button title="Tomar foto con la cámara" onPress={handleTakePhoto} buttonStyle={styles.addButton} />
      <Button title="Subir imagen" onPress={handleUploadImage} buttonStyle={styles.addButton}/>

      <Button
        title="Cerrar sesión"
        type="outline"
        containerStyle={{ marginTop: 20 }}
        onPress={handleLogout}
        buttonStyle={styles.closeButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'black',
  },
  closeButtonText: {
    color: 'white',  // Texto en negro
    fontSize: 16,    // Tamaño del texto
    fontWeight: 'bold'
  },
});