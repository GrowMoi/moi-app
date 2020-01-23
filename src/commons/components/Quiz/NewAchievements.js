import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert/Alert';
import GenericAlert from '../Alert/GenericAlert';
import userActions from '../../../actions/userActions';
import { Actions } from 'react-native-router-flux';
import { ACHIEVEMENT_FINAL_QUIZ_NUMBER } from '../../../constants'

class NewAchievementsModal extends Component {
  testAchievementNumber = ACHIEVEMENT_FINAL_QUIZ_NUMBER
  state = {
    currentAchievement: 0,
    showModal: false,
    loading: false,
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ showModal: true }) }, 100)
  }

  get hasTestAchievement() {
    const { achievements } = this.props
    const testAchievement = achievements.find((achie) => achie.number == this.testAchievementNumber)
    return testAchievement
  }

  get orderAchivements() {
    const { achievements } = this.props

    let orderedAchievements = achievements
    if(!!this.hasTestAchievement) {
      const filteredAchivements = achievements.filter(achiv => achiv.number != this.testAchievementNumber)
      orderedAchievements = [...filteredAchivements, this.hasTestAchievement]
    }

    return orderedAchievements
  }

  get currentAchiv() {
    const { currentAchievement } = this.state;

    const current = this.orderAchivements[currentAchievement];
    return current;
  }

  get isLastAchievement() {
    return (this.orderAchivements.length - 1) === this.state.currentAchievement;
  }

  formatContent = () => {
    const { profile } = this.props;

    if(!!this.hasTestAchievement && (this.currentAchiv.number == this.testAchievementNumber)) {
      return `Felicitaciones ${profile.username}, completaste el árbol! Realiza la prueba final, para comprobar tu aprendizaje.`
    }

    return 'Felicitaciones ' + profile.username + '! Acabas de completar ' + this.currentAchiv.name + '. ' +
      'Activa este item en el inventario y disfruta de tus logros aprendiendo con Mi Aula BdP';
  }

  textButton = () => {
    return (this.isLastAchievement) ? 'Cerrar' : 'Siguiente';
  }

  handleOkButton = () => {
    const { onHideModal } = this.props;
    if (this.isLastAchievement) {
      onHideModal();
    } else {
      this.setState(prevState => ({ currentAchievement: (prevState.currentAchievement + 1) }));
    }
  }

  goToFinalQuiz = async() => {
    const { loadFinalTestAsync, onHideModal, userTree = {}, } = this.props
    const finalTestId = ((userTree.meta || {}).final_test || {}).id

    this.setState({ loading: true })
    console.log('test ID go to Final quiz', finalTestId)
    try {
      await loadFinalTestAsync(finalTestId);
      this.setState(
        () => ({ loading: false }),
        () => {
          onHideModal();
          Actions.quiz({ quizTitle: 'Test Final' });
        }
      )
    } catch (error) {
      console.log('ERROR NewAchievements', error);
      this.setState({ loading: false })
    }
  }


  render() {
    let extraProps = {}
    if(!!this.hasTestAchievement && (this.currentAchiv.number == this.testAchievementNumber)) {
      extraProps = {
        onNext: () => { this.goToFinalQuiz() },
        nextText: 'Ok',
        nextProps: {
          loading: this.state.loading,
        }
      }
    }

    return (
      <Alert open={this.state.showModal}>
        <GenericAlert
          message='Nuevo logro obtenido!'
          description={this.formatContent()}
          onCancel={this.handleOkButton}
          cancelText={this.textButton()}
          {...extraProps}
        />
      </Alert>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
  userTree: state.tree.userTree,
})

const mapDispatchToProps = {
  loadFinalTestAsync: userActions.loadFinalTestAsync,
}

NewAchievementsModal.propTypes = {
  achievemtens: PropTypes.any,
  hideModal: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewAchievementsModal)
