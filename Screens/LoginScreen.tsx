import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  function login() {
    switch (true) {
      case !correo || !contraseña:
        Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña');
        return;
    }

    signInWithEmailAndPassword(auth, correo, contraseña)
      .then((userCredential) => {
        console.log('Usuario autenticado:', userCredential.user.email);
        setCorreo('');
        setContraseña('');
        navigation.navigate('Welcome');
      })
      .catch((error) => {
        let titulo = 'Error';
        let mensaje = '';

        switch (error.code) {
          case 'auth/invalid-credential':
            titulo = 'Credenciales inválidas';
            mensaje = 'Las credenciales son incorrectas. Verifica tu correo y contraseña.';
            break;
          case 'auth/user-not-found':
            titulo = 'Usuario no encontrado';
            mensaje = 'El correo electrónico no está registrado.';
            break;
          case 'auth/wrong-password':
            titulo = 'Contraseña incorrecta';
            mensaje = 'La contraseña proporcionada es incorrecta.';
            break;
          default:
            mensaje = `${error.code}: ${error.message}`;
        }
        Alert.alert(titulo, mensaje);
      });
  }

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/dd/92/bb/dd92bb8f7847d47f2ee41efccaf412fd.jpg' }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput placeholder="Ingresar correo" style={styles.input} onChangeText={setCorreo} value={correo} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Ingresar contraseña" style={styles.input} onChangeText={setContraseña} value={contraseña} secureTextEntry />
        <Button title="Login" onPress={login} color="#4CAF50" />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.createAccount}>Crear una cuenta</Text>
        </TouchableOpacity>
        <Button title="Olvidaste la contraseña" onPress={() => navigation.navigate('Restablecer')} />
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
  createAccount: {
    color: '#fff',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});




