import React, { useState, useEffect } from 'react';
import { View, Platform, Alert } from 'react-native';
import Button from '../Buttons/Button'
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux'
import neuronActions from '../../../actions/neuronActions'
import Preloader from '../Preloader/Preloader';

function ConsignaPicker(props) {
  const [media, setMedia] = useState(null);
  const [uploading, setUploadingState] = useState(false);
  const [errors, setError] = useState(null);
  const [ok, setOk] = useState(null);

  useEffect(() => {
    if(!uploading && !!errors) {
      Alert.alert('Error de Subida', 'Lo sentimos, no se pudo cargar el archivo.', [{
        text: "Entendido",
        onPress: () => {
          setError(null)
          if(props.onError) props.onError(error)
        }
      }])
    }
  }, [errors, uploading])

  useEffect(() => {
    if(!!ok) {
      Alert.alert('Subir Media', 'Archivo se subio satisfactoriamente', [{
        text: "Entendido",
        onPress: () => {
          setOk(null);
          if(props.onOk) props.onOk(true)
        }
      }])
    }
  }, [ok])

  const allowAccess = () => {
    if (Platform.OS !== 'web') {
      return ImagePicker.requestMediaLibraryPermissionsAsync();
    }
  }

  const uploadMedia = async () => {
    if(!media) return;
    if(!props.contentId) {
      console.warn('We need contentId prop to upload.')
      return;
    }

    let formData = new FormData();
    formData.append('content_id', props.contentId);
    formData.append('media', media);

    try {
      setUploadingState(true);
      const res = await props.sendMediaFiles(formData);

      setUploadingState(false);
      setError(null);
      setOk(true);
    } catch (error) {
      setUploadingState(false);
      setError(error.message);
    }
  }


  const pickImage = async () => {
    try {
      const { status } = await allowAccess();

      if (status !== 'granted') {
        Alert.alert('Permisos', 'Lo sentimos, necesitamos permisos para acceder a tu carrete de imagenes! Te recomendamos activarlo manualmente');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const filename = (result.uri || "").split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `${result.type}/${match[1]}` : result.type;

        const mediaResult = {
          ...result,
          filename,
          name: filename,
          type,
        }

        if(props.onPickedMedia) props.onPickedMedia(mediaResult);
        setMedia(mediaResult)
      }

    } catch (error) {
    }
  };

  return (
    <>
      {uploading && <Preloader />}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 10, flexDirection: 'row' }}>
        <Button title={props.title || "Elegir imagen/video"} onPress={pickImage} />
        <Button title="Subir media" onPress={uploadMedia} disabled={!media}/>
      </View>
    </>
  )
}

const mapDispatchToProps = {
  sendMediaFiles: neuronActions.sendMediaFiles,
}

export default connect(null, mapDispatchToProps)(ConsignaPicker)
