import { Audio } from 'expo';
import sounds from './sounds';

export default class Sound {

  soundObject;
  soundActionsObject;
  processing = false;

  constructor() { }

  static play = async (options) => {
    if (!options || this.processing) return;

    this.processing = true;
    await Sound.stop();
    const { source, volume = 1, repeat = false } = options;
    const { sound, status } = await Audio.Sound.create(source);
    this.status = status;
    this.soundObject = sound;
    this.soundObject.setIsLoopingAsync(repeat);
    this.soundObject.setVolumeAsync(volume);
    this.soundObject.playAsync();
    this.processing = false;
  }

  static playOverBackgroundSound = async (soundName, repeatSound = false) => {
    const { sound } = await Audio.Sound.create(sounds.actions[soundName]);
    this.soundActionsObject = sound;
    this.soundActionsObject.setIsLoopingAsync(repeatSound);
    this.soundActionsObject.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish && !repeatSound) {
        this.soundObject.replayAsync();
      }
    });
    await this.soundObject.pauseAsync();
    await this.soundActionsObject.playAsync();
  }

  static stopOverBackgroundSound = async () => {
    await this.soundActionsObject.stopAsync();
    await this.soundObject.replayAsync();
  }

  static pause = async () => {
    if (!this.soundObject) return;
    let status = await this.soundObject.getStatusAsync();
    if (status.isPlaying) {
      await this.soundObject.pauseAsync();
    }
  }

  static stop = async () => {
    if (this.soundObject) {
      return await this.soundObject.stopAsync();
    }
  }

}