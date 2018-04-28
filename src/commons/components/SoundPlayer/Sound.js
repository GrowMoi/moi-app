import { Audio } from 'expo';

export default class Sound {

    soundObject;

    constructor() { }

    play = async (options) => {
        if (!options) return;
        const { source, volume = 1, repeat = false } = options;

        await this.stop();

        const { sound, status } = await Audio.Sound.create(source);

        this.soundObject = sound;
        this.soundObject.setIsLoopingAsync(repeat);
        this.soundObject.setVolumeAsync(volume);
        this.soundObject.playAsync();
    }

    stop = async () => {
        if (this.soundObject) {
            await this.soundObject.stopAsync();
        }
    }

}