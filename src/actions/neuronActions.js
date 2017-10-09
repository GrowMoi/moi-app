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

const setCurrentContent = content => ({
  type: actionTypes.LOAD_CONTENT_SELECTED,
  payload: content,
});

const loadContentByIdAsync = (neuronId, contentId) => async (dispatch) => {
  const content = await api.contents.getContentById(neuronId, contentId);
  dispatch(setCurrentContent(content));
  return content;
};

export default {
  loadNeuronByIdAsync,
  loadContentByIdAsync,
};
