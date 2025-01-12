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
      source={{ uri: 'https://i.pinimg.com/736x/5e/c3/60/5ec360e2f272f183b0996d33d697af94.jpg' }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput 
          placeholder="Ingresar correo" 
          style={styles.input} 
          onChangeText={setCorreo} 
          value={correo} 
          keyboardType="email-address" 
          autoCapitalize="none" 
        />
        <TextInput 
          placeholder="Ingresar contraseña" 
          style={styles.input} 
          onChangeText={setContraseña} 
          value={contraseña} 
          secureTextEntry 
        />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.createAccount}>Crear una cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Restablecer')}>
          <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A8D5BA',
    shadowColor: '#A8D5BA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#A8D5BA',
    marginBottom: 20,
    textShadowColor: '#003300',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#A8D5BA',
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#A8D5BA',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#A8D5BA',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccount: {
    color: '#A8D5BA',
    marginTop: 15,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#A8D5BA',
    marginTop: 15,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
