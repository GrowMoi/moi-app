import Sound from 'react-native-sound';
import sounds from './sounds';
import { AppState } from 'react-native';

export default class MoiSound {

  static soundObject;
  static soundActionsObject;
  static processing = false;
  static loadInitSetup = true;
  static loadedSounds = {};
  static currentSound = null;

  static setup = function () {
    Sound.setCategory('Playback');
    AppState.addEventListener('change', MoiSound._handleAppStateChange);
  }

  static loadSounds = () => {
    for (const key in sounds.actions) {
      MoiSound.loadedSounds[key] = new Sound(sounds.actions[key] + '.mp3', Sound.MAIN_BUNDLE, (error) => {
      });
    }
  }

  static play = async (options) => {
    if (MoiSound.loadInitSetup) {
      MoiSound.setup();
      MoiSound.loadSounds();
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

  static playOverBackgroundSound = async (soundName, repeatSound = false, currentTime) => {
    MoiSound.currentSound = MoiSound.loadedSounds[soundName];
    MoiSound.currentSound.setNumberOfLoops(repeatSound ? -1 : 0);
    if(currentTime) MoiSound.currentSound.setCurrentTime(currentTime)
    MoiSound.currentSound.play();
  }

  static stopOverBackgroundSound = async () => {
    MoiSound.currentSound.stop();
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

  static _handleAppStateChange = function (currentAppState) {
    if (currentAppState === 'background') {
      MoiSound.pause();
    }
    if (currentAppState === "active") {
      MoiSound.play();
    }
  }
}