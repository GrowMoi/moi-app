import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert/Alert';
import GenericAlert from '../Alert/GenericAlert';

@connect(store => ({
  profile: store.user.profile,
}), {})
export default class EventCompletedModal extends Component {

  get alertDescription() {
    const { eventTitle,  profile: {username} } = this.props;
    return `Felicidades ${username}! Acabas de completar el evento: ${eventTitle}. Activa este item en el inventario y disfruta de tus logros aprendiendo con Moi`;
  }

  render() {
    return (
      <Alert open>
        <GenericAlert
          message='Evento Completado!'
          description={this.alertDescription}
          onCancel={this.props.onHideModal}
          cancelText={'OK'}
        />
      </Alert>
    );
  }
}

EventCompletedModal.propTypes = {
  titleEvent: PropTypes.any,
  onHideModal: PropTypes.func,
};
