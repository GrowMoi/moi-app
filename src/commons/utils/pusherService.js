import * as constants from '../../constants';
import Pusher from 'pusher-js/react-native';

class PusherService {

  static pusherClient = {};
  static subscriptionSucceeded = false;
  static hasError = null;
  static currentCallbacks = {};

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

  static storeCallback(channel, options) {
    const { eventName, action } = options || {};
    const isNewCallback = !(action.id in this.currentCallbacks);
    if (isNewCallback) {
      this.currentCallbacks[action.id] = action.callback;
      channel.bind(eventName, this.currentCallbacks[action.id]);
    }
  }

  static listen(options) {
    const { channelName } = options || {};
    if (this.pusherClient && this.pusherClient.subscribe) {
      const channel = this.pusherClient.subscribe(channelName);

      if (this.subscriptionSucceeded && !this.hasError) {
        this.storeCallback(channel, options);

      } else {
        channel.bind('pusher:subscription_succeeded', () => {
          this.subscriptionSucceeded = true;
          this.storeCallback(channel, options);
        });

        channel.bind('pusher:subscription_error', (err) => {
          this.subscriptionSucceeded = false;
          this.hasError = err;
        })
      }
    } else {
      console.error('Pucher client error');
      this.subscriptionSucceeded = false;
      this.hasError = new Error('No client');
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
