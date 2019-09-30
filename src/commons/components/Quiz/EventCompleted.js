import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert/Alert';
import GenericAlert from '../Alert/GenericAlert';
import { normalize } from '../../utils';
class EventCompletedModal extends Component {

  get alertDescription() {
    const { eventTitle, eventType, profile: {username} } = this.props;
    return `Felicidades ${username}! Acabas de completar el ${eventType}: ${eventTitle}. Activa este item en el inventario y disfruta de tus logros aprendiendo con Moi`;
  }

  render() {
    const { eventType } = this.props;

    return (
      <Alert open>
        <GenericAlert
          message={`${normalize.capitalizeFirstLetter(eventType)} completado!`}
          description={this.alertDescription}
          onCancel={this.props.onHideModal}
          cancelText={'OK'}
        />
      </Alert>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
})

EventCompletedModal.propTypes = {
  titleEvent: PropTypes.any,
  onHideModal: PropTypes.func,
};

export default connect(
  mapStateToProps
)(EventCompletedModal)
