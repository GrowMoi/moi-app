import store from '../../store';
import userActions from '../../actions/userActions'

const validateAuth = async () => {
  try {
    await store.dispatch(userActions.validateToken());
  } catch (error) {
    console.log('AUTH NOT VALID', error.message);
    await store.dispatch(userActions.resetData());
  }

  return Promise.resolve()
}

export default validateAuth;