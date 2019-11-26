import React, { useState } from 'react'
import { View } from 'react-native'
import Alert from '../../commons/components/Alert/Alert'
import GenericAlert from '../../commons/components/Alert/GenericAlert'


export const AlertCantReadContent = ({ open = false, ...rest }) => {
  return (
    <Alert open={open}>
      <GenericAlert
        message='Contenido Bloqueado'
        description='Aun debes aprender otros contenidos previos'
        cancelText={'Seguir Leyendo'}
        nextText={'Volver al arbol'}
        {...rest}
      />
    </Alert>
  )
}
