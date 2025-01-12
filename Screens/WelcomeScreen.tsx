import { Button, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
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
      source={{ uri: 'https://i.pinimg.com/736x/69/d9/cc/69d9ccf6e8dd35dc0ee65bce08db89a1.jpg' }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenido</Text>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
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
    fontSize: 40,
    fontWeight: 'bold',
    color: '#A8D5BA', 
    marginBottom: 20,
    textShadowColor: '#003300', 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  button: {
    backgroundColor: '#A8D5BA',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


