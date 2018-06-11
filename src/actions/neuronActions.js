import api from '../api';
import { setHeaders } from './headerActions';
import * as actionTypes from './actionTypes';

const setCurrentNeuron = neuron => ({
  type: actionTypes.LOAD_NEURON_SELECTED,
  payload: neuron,
});

const setCurrentContent = content => ({
  type: actionTypes.LOAD_CONTENT_SELECTED,
  payload: content,
});

const setCurrentRecomendedContents = content => ({
  type: actionTypes.LOAD_RECOMENDED_CONTENTS,
  payload: content,
});

const loadNeuronByIdAsync = id => async (dispatch) => {
  const res = await api.neuron.getNeuronById(id);
  dispatch(setCurrentNeuron(res.data));
  // dispatch(setHeaders(res.headers));

  return res;
};

const loadContentByIdAsync = (neuronId, contentId) => async (dispatch) => {
  const res = await api.contents.getContentById(neuronId, contentId);

  dispatch(setCurrentContent(res.data));
  // dispatch(setHeaders(res.headers));

  return res;
};

const loadRecomendedContents = () => async (dispatch) => {
  let res;
  try {
    res = await api.contents.getRecomendedContents();
    dispatch(setCurrentRecomendedContents(res.data));
    // dispatch(setHeaders(res.headers));
  } catch (error) {
    // console.log(error);
  }

  return res;
};

export default {
  loadNeuronByIdAsync,
  loadContentByIdAsync,
  loadRecomendedContents,
};
