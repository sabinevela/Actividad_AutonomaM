import { Button, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Config';

export default function WelcomeScreen({ navigation }: any) {
  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.error(error.message);
      });
    navigation.navigate('Login');
  }

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/ca/5a/9e/ca5a9e404b614161e9c7806e73f23ace.jpg' }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenido</Text>
        <Button title="Cerrar Sesión" onPress={logout} color="#4CAF50" />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
});

