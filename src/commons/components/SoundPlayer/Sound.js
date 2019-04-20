import Sound from 'react-native-sound';
import sounds from './sounds';

export default class MoiSound {

  soundObject;
  soundActionsObject;
  processing = false;

  constructor() {
    Sound.setCategory('Playback');
  }

  static play = async (options) => {

    if(this.soundObject && !this.soundObject.isPlaying()) {
      this.soundObject.play();
      return;
    }

    if (!options || this.processing) return;
    await MoiSound.stop();

    const { source, volume = 1, repeat = false } = options;
    this.processing = true;

    this.soundObject = new Sound(source + '.mp3', Sound.MAIN_BUNDLE, (error) => {

      if(error) return;

      this.processing = false;
      this.soundObject.setVolume(volume);
      this.soundObject.setNumberOfLoops(repeat ? -1 : 0);
      this.soundObject.play();
    });
  }

  static playOverBackgroundSound = async (soundName, repeatSound = false) => {
    this.soundActionsObject = new Sound(sounds.actions[soundName] + '.mp3', Sound.MAIN_BUNDLE, (error) => {

      if(error) return;

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
}