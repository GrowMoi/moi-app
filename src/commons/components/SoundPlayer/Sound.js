import Sound from 'react-native-sound';
import sounds from './sounds';
import { AppState } from 'react-native';

export default class MoiSound {

  static soundObject;
  static soundActionsObject;
  static processing = false;
  static loadInitSetup = true;

  static setup = function() {
    Sound.setCategory('Playback');
    AppState.addEventListener('change', MoiSound._handleAppStateChange);
  }

  static play = async (options) => {
    if(MoiSound.loadInitSetup) {
      MoiSound.setup();
      MoiSound.loadInitSetup = false;
    }

    if (this.soundObject && !this.soundObject.isPlaying()) {
      this.soundObject.play();
      return;
    }

    if (!options || this.processing) return;
    await MoiSound.stop();

    const { source, volume = 1, repeat = false } = options;
    this.processing = true;

    this.soundObject = new Sound(source + '.mp3', Sound.MAIN_BUNDLE, (error) => {

      if (error) return;

      this.processing = false;
      this.soundObject.setVolume(volume);
      this.soundObject.setNumberOfLoops(repeat ? -1 : 0);
      this.soundObject.play();
    });
  }

  static playOverBackgroundSound = async (soundName, repeatSound = false) => {
    this.soundActionsObject = new Sound(sounds.actions[soundName] + '.mp3', Sound.MAIN_BUNDLE, (error) => {

      if (error) return;

      this.soundActionsObject.setNumberOfLoops(repeatSound ? -1 : 0);
      this.soundActionsObject.play();
    });
  }

  static stopOverBackgroundSound = async () => {
    this.soundActionsObject.stop();
  }

  static pause = async () => {
    let isPlaying = this.soundObject && this.soundObject.isPlaying();
    if (isPlaying) {
      await this.soundObject.pause();
    }
  }

  static stop = async () => {
    let isPlaying = this.soundObject && this.soundObject.isPlaying();
    if (isPlaying) {
      this.soundObject.pause();
      this.soundObject.release();
      this.soundObject = null;
    }
  }

  static _handleAppStateChange =  function(currentAppState) {
    if (currentAppState === 'background') {
      MoiSound.pause();
    }
    if (currentAppState === "active") {
      MoiSound.play();
    }
  }
}