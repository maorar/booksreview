import React, { useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import app from '../../../firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Configura el emulador de autenticación (solo en desarrollo)
  useEffect(() => {
    const auth = getAuth(app);
    //if (process.env.NODE_ENV === 'development') {
      //connectAuthEmulator(auth, 'http://localhost:9099');
      connectAuthEmulator(auth, 'http://192.168.1.13:9099');
    //}
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el token de autenticación en AsyncStorage
      const token = await user.getIdToken();
      await AsyncStorage.setItem('userToken', token);

      // Navegar a la pantalla principal
      navigation.navigate('Library');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Registro</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <Input placeholder="Confirmar Contraseña" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <Button title="Registrarse" containerStyle={styles.button} onPress={handleRegister} />
      <Button 
        title="¿Ya tienes cuenta? Inicia sesión" 
        type="clear"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
});