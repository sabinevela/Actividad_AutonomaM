import { useState } from 'react';
import { Button, Image, View, Text, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function GaleriaScreen() {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
    return (
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/da/fe/67/dafe67ac95b0c2b34dea1d92ab000532.jpg' }}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <Text style={styles.message}>¿Deseas abrir la galería para seleccionar una imagen?</Text>
          <Button title="Abrir Galería" onPress={pickImage} color="#A8D5BA" />
          {image && <Image source={{ uri: image }} style={styles.image} />}
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
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 400,
    marginTop: 20,
    borderRadius: 15,
  },
});
