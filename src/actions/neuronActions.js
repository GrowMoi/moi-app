import api from '../api';
import * as actionTypes from './actionTypes';

const setCurrentNeuron = neuron => ({
  type: actionTypes.LOAD_NEURON_SELECTED,
  payload: neuron,
});

const loadNeuronByIdAsync = id => async (dispatch) => {
  const neuron = await api.neuron.getNeuronById(id);
  dispatch(setCurrentNeuron(neuron));

  return neuron;
};

export default {
  loadNeuronByIdAsync,
};
