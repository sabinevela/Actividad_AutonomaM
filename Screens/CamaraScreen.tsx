import { useState } from 'react';
import { Button, Image, View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CamaraScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    Alert.alert('Subiendo...', 'Tu imagen está siendo subida.');

    setTimeout(() => {
      Alert.alert('Éxito', 'Imagen subida correctamente');
      setImage(null);
    }, 2000);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/a3/2f/4c/a32f4c9001aca09272f9817dd07049de.jpg' }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.message}>¿Quieres tomar una foto?</Text>
        <Button title="Tomar una foto" onPress={pickImage} color="#A8D5BA" />
        {image && (
          <>
            <Image source={{ uri: image }} style={styles.image} />
            <Button title="Subir" onPress={uploadImage} color="#A8D5BA" />
          </>
        )}
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
    height: 300,
    marginTop: 20,
    borderRadius: 15,
  },
});



