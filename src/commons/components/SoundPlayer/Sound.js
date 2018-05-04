import { Audio } from 'expo';

export default class Sound {

    soundObject;

    constructor() { }

    static play = async (options) => {
        if (!options) return;
        const { source, volume = 1, repeat = false } = options;

        await Sound.stop();

        const { sound, status } = await Audio.Sound.create(source);
        this.status = status;
        this.soundObject = sound;
        this.soundObject.setIsLoopingAsync(repeat);
        this.soundObject.setVolumeAsync(volume);
        this.soundObject.playAsync();
    }

    static pause = async () => {
        if (!this.soundObject) return;
        let status = await this.soundObject.getStatusAsync();
        if(status.isPlaying) {
            await this.soundObject.pauseAsync();
        } else {
            this.soundObject.playAsync();
        }
    }

    static stop = async () => {
        if (this.soundObject) {
            return await this.soundObject.stopAsync();
        }
    }

}