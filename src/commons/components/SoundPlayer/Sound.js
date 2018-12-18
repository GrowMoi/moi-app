import { Audio } from 'expo';

export default class Sound {

    soundObject;
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

    static pause = async () => {
        if (!this.soundObject) return;
        let status = await this.soundObject.getStatusAsync();
        if(status.isPlaying) {
            await this.soundObject.pauseAsync();
        }
    }

    static stop = async () => {
        if (this.soundObject) {
            return await this.soundObject.stopAsync();
        }
    }

}