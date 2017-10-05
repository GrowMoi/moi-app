import { client } from '../../api';

export default function setAuthorizationToken(headers) {
  if (headers) {
    client.defaults.headers.common['access-token'] = headers['access-token'];
    client.defaults.headers.common['token-type'] = headers['token-type'];
    client.defaults.headers.common['client'] = headers['client']; // eslint-disable-line
    client.defaults.headers.common['expiry'] = headers['expiry']; // eslint-disable-line
    client.defaults.headers.common['uid'] = headers['uid']; // eslint-disable-line
  } else {
    delete client.defaults.headers.common['access-token'];
    delete client.defaults.headers.common['token-type'];
    delete client.defaults.headers.common.client;
    delete client.defaults.headers.common.expiry;
    delete client.defaults.headers.common.uid;
  }
}
