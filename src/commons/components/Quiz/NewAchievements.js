import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert/Alert';
import GenericAlert from '../Alert/GenericAlert';

class NewAchievementsModal extends Component {
  state = {
    currentAchievement: 0,
  }

  formatContent = () => {
    const { currentAchievement } = this.state;
    const { achievements, profile } = this.props;

    const current = achievements[currentAchievement];

    return 'Felicidades ' + profile.username + '! Acabas de completar ' + current.name + '. ' +
      'Activa este item en el inventario y disfruta de tus logros aprendiendo con Moi';
  }

  textButton = () => {
    const { currentAchievement } = this.state;
    const { achievements } = this.props;

    return ((achievements.length - 1) === currentAchievement) ? 'OK' : 'Siguiente';
  }

  handleOkButton = () => {
    const { currentAchievement } = this.state;
    const { achievements, onHideModal } = this.props;
    if ((achievements.length - 1) === currentAchievement) {
      onHideModal();
    } else {
      this.setState(prevState => ({ currentAchievement: (prevState.currentAchievement + 1) }));
    }
  }

  render() {
    return (
      <Alert open>
        <GenericAlert
          message='Nuevo logro obtenido!'
          description={this.formatContent()}
          onCancel={this.handleOkButton}
          cancelText={this.textButton()}
        />
      </Alert>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
})

NewAchievementsModal.propTypes = {
  achievemtens: PropTypes.any,
  hideModal: PropTypes.func,
};

export default connect(mapStateToProps)(NewAchievementsModal)
