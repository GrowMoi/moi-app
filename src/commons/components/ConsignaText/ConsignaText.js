import React, { useState, useEffect } from 'react'
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native'
import neuronActions from '../../../actions/neuronActions';
import { Palette, Size } from '../../styles';
import NoteInput from '../NoteInput/NoteInput';
import Preloader from '../Preloader/Preloader';

const TextLeftBorder = styled(View)`
  padding-left: ${Size.spaceSmall};
  margin-left: ${Size.spaceSmall};
  border-color: transparent;
  border-left-width: 1;
  border-left-color: ${Palette.white.alpha(0.3).css()};
`;

const ConsignaText = (props) => {
  const [uploading, setUploadingState] = useState(false);
  const [errors, setError] = useState(null);
  const [ok, setOk] = useState(null);

  useEffect(() => {
    if(!uploading && !!errors) {
      Alert.alert('Consigna', 'Lo sentimos, no se pudo subir la consigna.', [{
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
      Alert.alert('Consigna', 'La consigna se subió satisfactoriamente', [{
        text: "Entendido",
        onPress: () => {
          setOk(null);
          if(props.onOk) props.onOk(true)
        }
      }])
    }
  }, [ok])

  return (
    <>
      {uploading && <Preloader />}
      <TextLeftBorder>
        <NoteInput
          text={props.text}
          onEndEditing={async (e) => {
            try {
              console.log(this);

              if(props.contentId) {
                setUploadingState(true);
                await props.sendMediaText({ content_id: props.contentId, text: e.nativeEvent.text });

                setUploadingState(false);
                setError(null);
                setOk(true);
              }

            } catch (error) {
              setUploadingState(false);
              setError(error.message);
            }
            // this.storeNotes(content.neuron_id, content.id, e.nativeEvent.text)
          }}
        />
      </TextLeftBorder>
    </>
  )
}

const mapDispatchToProps = {
  sendMediaText: neuronActions.sendMediaText,
}

export default connect(null, mapDispatchToProps)(ConsignaText)
