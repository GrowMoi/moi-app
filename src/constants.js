import { isTablet } from 'react-native-device-detection';

export const LANDSCAPE = 'LANDSCAPE';
export const PORTRAIT = 'PORTRAIT';
export const DRAWER_OFFSET = isTablet ? 320 : 220;
export const FLORECIDA = 'florecida';
export const TIME_FOR_INACTIVITY = 12000;
// export const URL_BASE = __DEV__ ? 'http://moi-backend.growmoi.com' : 'http://moi-backend.growmoi.com';
export const URL_BASE = __DEV__ ? 'https://moi-staging.herokuapp.com' : 'http://moi-backend.growmoi.com';
export const WEB_URL_BASE = __DEV__ ? 'http://moi-frontend.herokuapp.com' : 'http://moi.growmoi.com';
export const CLOUDINARY_BASE = 'https://api.cloudinary.com';
