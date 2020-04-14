import React, { useState, useEffect } from 'react'
import validateAuth from '../../commons/utils/validation'
import Loader from '../../commons/components/Loader/Loader';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import * as deviceActions from '../../actions/deviceActions'

function ResetScene(props) {
  const [hasReset, setReseted] = useState(false);

  const onAppReady = () => {
    Actions.login({ type: ActionConst.RESET });
  }

  useEffect(() => {
    props.hiddenNetworkAlert();
  }, [])

  useEffect(() => {
    const validate = async () => {
      await validateAuth();
      setTimeout(() => {
        setReseted(true)
      }, 2500)
    }

    validate()
  }, [])

  return (
    <Loader
      assetsLoaded={hasReset}
      onAppReady={onAppReady}
    />
  )
}

const mapDispatchToProps = {
  hiddenNetworkAlert: deviceActions.hiddenNetworkAlert
}

export default connect(null, mapDispatchToProps)(ResetScene)