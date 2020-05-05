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

  static listen() {
    // TODO

  }

  static unlisten() {
    // TODO
  }

}

export default PusherService;
