import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegisterScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  function register() {
    switch (true) {
      case !correo || !contraseña:
        Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña');
        return;
    }

    createUserWithEmailAndPassword(auth, correo, contraseña)
      .then((userCredential) => {
        console.log('Usuario registrado:', userCredential.user.email);
        setCorreo('');
        setContraseña('');
        navigation.navigate('Welcome');
      })
      .catch((error) => {
        let titulo = 'Error';
        let mensaje = '';

        switch (error.code) {
          case 'auth/email-already-in-use':
            titulo = 'Correo ya en uso';
            mensaje = 'Este correo ya está registrado. Intenta con otro correo.';
            break;
          case 'auth/weak-password':
            titulo = 'Contraseña débil';
            mensaje = 'La contraseña debe tener al menos 6 caracteres.';
            break;
          default:
            mensaje = `${error.code}: ${error.message}`;
        }
        Alert.alert(titulo, mensaje);
      });
  }

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/c2/cc/16/c2cc16b446a9625adbf592ebb1c0fced.jpg' }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Registrarse</Text>
        <TextInput placeholder="Ingresar correo" style={styles.input} onChangeText={setCorreo} value={correo} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Ingresar contraseña" style={styles.input} onChangeText={setContraseña} value={contraseña} secureTextEntry />
        <Button title="Registro" onPress={register} color="#4CAF50" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

