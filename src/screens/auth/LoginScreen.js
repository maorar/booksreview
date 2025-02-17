import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword, connectAuthEmulator } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import app from '../../../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Configura el emulador de autenticación (solo en desarrollo)
  useEffect(() => {
    const auth = getAuth(app);
    if (process.env.NODE_ENV === 'development') {
      connectAuthEmulator(auth, 'http://192.168.1.13:9099');
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el token de autenticación en AsyncStorage
      const token = await user.getIdToken();
      await AsyncStorage.setItem('userToken', token);

      // Navegar a la pantalla principal
      navigation.replace('Library');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert(error.message);
    }
  };

  // Verificar si el usuario ya está autenticado al cargar la pantalla
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // Si hay un token, navegar a la pantalla principal
        navigation.replace('Library');
      }
    };

    checkLoginStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Iniciar Sesión</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Iniciar Sesión" containerStyle={styles.button} onPress={handleLogin} />
      <Button 
        title="¿No tienes cuenta? Regístrate" 
        type="clear"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
});