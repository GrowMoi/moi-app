import * as constants from '../../constants';
import Pusher from 'pusher-js/react-native';

class PusherService {

  static pusherClient = {};

  static initClient() {
    const PUSHER_KEY = constants.PUSHER_KEY
    try {
      this.pusherClient = new Pusher(PUSHER_KEY, {
        encrypted: true,
        cluster: 'us2'
      });
    } catch (error) {
      console.error(error);
    }
  }

  static listen(options, callback) {
    const { channelName, eventName } = options || {};
    if (this.pusherClient && this.pusherClient.subscribe) {
      const channel = this.pusherClient.subscribe(channelName);
      channel.bind('pusher:subscription_succeeded', () => {
        channel.bind(eventName, callback);
      });
    } else {
      console.error('Pucher client error');
    }
  }

  static unlisten(options) {
    const { channelName } = options || {};
    if (this.pusherClient && this.pusherClient.unsubscribe) {
      this.pusherClient.unsubscribe(channelName);
    } else {
      console.error('Pucher client error');
    }
  }

}

export default PusherService;
