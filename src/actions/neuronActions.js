import api from '../api';
import { setHeaders } from './headerActions';
import * as actionTypes from './actionTypes';
import { Sound, sounds } from '../commons/components/SoundPlayer';

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

const stopAudio = () => ({
  type: actionTypes.STOP_CURRENT_AUDIO,
});

const playAudio = () => ({
  type: actionTypes.PLAY_CURRENT_AUDIO,
});

const setCurrentAudioBg = (audio) => ({
  type: actionTypes.SET_CURRENT_AUDIO,
  payload: audio,
});

const removeCurrentAudioBg = () => ({
  type: actionTypes.REMOVE_CURRENT_AUDIO,
});

const stopCurrentBackgroundAudio = () => async (dispatch) => dispatch(stopAudio());
const playCurrentBackgroundAudio = () => async (dispatch) => dispatch(playAudio());
const setCurrentBackgroundAudio = (audio) => (dispatch) => {
  if(sounds.playIn[audio.soundName].includes(audio.scene) !==  sounds.playIn[audio.soundName].includes(audio.previousScene)) {
    dispatch(setCurrentAudioBg(audio));
   }
};
const removeCurrentBackgroundAudio = () => dispatch => {
  dispatch(removeCurrentAudioBg());
}

const loadNeuronByIdAsync = id => async (dispatch) => {
  const res = await api.neuron.getNeuronById(id);

  dispatch(setHeaders(res.headers));
  dispatch(setCurrentNeuron(res.data));

  return res;
};

const loadRandomNeuronContentByIdAsync = id => async (dispatch) => {

  try {
    const res = await api.neuron.getNeuronById(id);

    dispatch(setHeaders(res.headers))
    dispatch({
      type: actionTypes.LOAD_RANDOM_NEURON_SELECTED,
      payload: res.data,
    })

    return res.data;
  } catch (error) {
    throw new Error(error)
  }
}

const loadContentByIdAsync = (neuronId, contentId) => async (dispatch) => {

  try {
    const response = await api.contents.getContentById(neuronId, contentId);
    const { data:{ kind } } = response;

    const responseRecomended = await api.contents.getRecommendedContentsOfMaxContent(neuronId, kind)
    const content = { ...response.data, recommended_contents: responseRecomended.data.contents }

    dispatch(setHeaders(response.headers));
    dispatch(setCurrentContent(content));

    return response;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

const loadRecomendedContents = () => async (dispatch) => {
  let res;
  try {
    res = await api.contents.getRecomendedContents();

    dispatch(setHeaders(res.headers));
    dispatch(setCurrentRecomendedContents(res.data));
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }

  return res;
};

const setNeuronLabelInfo = (neuronInfo = {}) => dispatch => {
  dispatch({ type: actionTypes.SET_NEURON_INFO, payload: neuronInfo });
}

const getNeuronInfoByIdAsync = (id) => async (dispatch) => {
  try {
    const response = await api.neuron.getNeuronById(id);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default {
  loadNeuronByIdAsync,
  loadContentByIdAsync,
  loadRecomendedContents,
  stopCurrentBackgroundAudio,
  playCurrentBackgroundAudio,
  setCurrentBackgroundAudio,
  removeCurrentBackgroundAudio,
  setNeuronLabelInfo,
  loadRandomNeuronContentByIdAsync,
  getNeuronInfoByIdAsync,
};
