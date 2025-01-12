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
            source={{ uri: 'https://i.pinimg.com/736x/a1/37/c8/a137c873c3db0c4426d7f9201a3c4c1b.jpg' }} 
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        padding: 25,
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#A8D5BA',
        marginBottom: 10,
        textAlign: 'center',
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
        borderWidth: 1.5,
        borderColor: '#fff',
        borderRadius: 25,
        marginBottom: 15,
        color: '#A8D5BA',
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#A8D5BA',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
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

