import React, { useState, useEffect } from 'react'
import { View, Alert, TextInput, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native'
import neuronActions from '../../../actions/neuronActions';
import { Palette, Size } from '../../styles';
import Button from '../Buttons/Button';
import NoteInput from '../NoteInput/NoteInput';
import Preloader from '../Preloader/Preloader';
import notebook from '../../../../assets/images/miscelaneous/notebook.png'

const TextLeftBorder = styled(View)`
  padding-left: ${Size.spaceSmall};
  margin-left: ${Size.spaceSmall};
  border-color: transparent;
  border-left-width: 1;
  border-left-color: ${Palette.white.alpha(0.3).css()};
`;

const Line = styled(View)`
  height: ${props => (props.height - 1)};
  border-bottom-color: ${Palette.white.alpha(0.3).css()};
  border-bottom-width: 1px;
`;

const LinesContainer = styled(View)`
  position: absolute;
  top: 6;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Container = styled(View)`
  position: relative;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const ConsignaText = (props) => {
  const [value, onChangeText] = useState('');
  const [uploading, setUploadingState] = useState(false);
  const [errors, setError] = useState(null);
  const [ok, setOk] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if(props.text) {
      onChangeText(props.text);
    }
  }, [])

  useEffect(() => {
    if(!uploading && !!errors) {
      setTimeout(() => {
        Alert.alert('Consigna', 'Lo sentimos, no se pudo subir la consigna.', [{
          text: "Entendido",
          onPress: () => {
            setError(null)
            if(props.onError) props.onError(error)
          }
        }])
      }, 100)
    }
  }, [errors, uploading])

  useEffect(() => {
    if(!!ok) {
      setTimeout(() => {
        Alert.alert('Consigna', 'La consigna se subió satisfactoriamente', [{
          text: "Entendido",
          onPress: () => {
            setOk(null);
            if(props.onOk) props.onOk(true)
          }
        }])
      }, 100)
    }
  }, [ok])

  const uploadConsigna = async () => {
    try {
      if(props.contentId) {
        setUploadingState(true);
        await props.sendMediaText({ content_id: props.contentId, text: value });

        setUploadingState(false);
        setError(null);
        setOk(true);
      }

    } catch (error) {
      setUploadingState(false);
      setError(error.message);
    }
  }

  const lineHeight = 15.5;
  const numberOfLines = height / lineHeight;
  const lines = new Array(Math.floor(numberOfLines)).fill(0);

  return (
    <>
      <Container>
        {uploading && <Preloader />}
        <LinesContainer>
          {lines && lines.length > 0 && lines.map((line, i) => <Line key={i} height={lineHeight} />)}
        </LinesContainer>
        <TextLeftBorder>
          <TextInput
            style={{ fontSize: lineHeight - 3, lineHeight: lineHeight - 1, padding: 0, color: 'white' }}
            onContentSizeChange={e => {
              setHeight(e.nativeEvent.contentSize.height)
            }}
            autoCorrect={false}
            value={value}
            editable
            multiline
            onChangeText={(text) => onChangeText(text)}
          />
        </TextLeftBorder>
      </Container>
      <Button
        title="Subir consigna"
        disabled={!(value || "").length > 0}
        onPress={() => { uploadConsigna() }}
      />
    </>
  )
}

const mapDispatchToProps = {
  sendMediaText: neuronActions.sendMediaText,
}

export default connect(null, mapDispatchToProps)(ConsignaText)
