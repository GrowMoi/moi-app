import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import withSound from '../../utils/withSound'
import { connect } from 'react-redux'
import quizActions from '../../../actions/quizActions'
import { Ionicons } from '@expo/vector-icons'
import { TextBody } from '../Typography'
import styled from 'styled-components/native';

const ButtonContainer = styled(View)`

`

const Container = styled(View)`
  background-color: #478aff;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-width: 2px;
  border-color: white;
  padding-horizontal: 20;
  padding-vertical: 5;
  border-radius: 40;
`

const CloseButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Container>
        <TextBody color="white">Salir</TextBody>
        <Ionicons style={{ color: 'white', marginLeft: 10 }} name="ios-close" size={35} />
      </Container>
    </TouchableOpacity>
  )
}


const CancelWithSound = (props) => {
  const [isCanceling, setCanceling] = useState(false)
  const [status, setStatus] = useState(null)
  const CloseBtnWithSound = withSound(CloseButton);

  useEffect(() => {
    props.onChange({
      isCanceling,
      status,
    });
  }, [isCanceling])

  return (
    <ButtonContainer style={props.style}>
      <CloseBtnWithSound
        onPress={async () => {
          if(props.testId) {
            setStatus('canceling')
            setCanceling(true)
            try {
              const response = await props.cancelCurrentLearn(props.testId);
              if(response.status === 200) {
                setStatus('OK')
                setCanceling(false)
              }
            } catch (error) {
              setCanceling(false)
              setStatus(error.message)
            }
          }

          if(props.onPress) props.onPress();
        }}
        soundName="next"
      />
    </ButtonContainer>
  )
}

const mapDispatchToProps = {
  cancelCurrentLearn: quizActions.cancelCurrentLearn,
}

export default connect(null, mapDispatchToProps)(CancelWithSound)