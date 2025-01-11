import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RestablecerScreen() {
    const [correo, setCorreo] = useState("");

    const restablecer = () => {
        if (!correo.trim()) {
            Alert.alert('Error', 'Por favor, ingresa un correo válido.');
            return;
        }

        sendPasswordResetEmail(auth, correo)
            .then(() => {
                Alert.alert('Mensaje', 'Se ha enviado un mensaje al correo.');
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    };

    return (
        <ImageBackground 
            source={require('../assets/gatos.jpg')} 
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Restablecer Contraseña</Text>
                <Text style={styles.subtitle}>Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#ddd"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={correo}
                    onChangeText={setCorreo}
                />
                
                <TouchableOpacity style={styles.button} onPress={restablecer}>
                    <Text style={styles.buttonText}>Enviar enlace</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 25,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#ddd',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
    },
    button: {
        backgroundColor: '#ff8c00',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
