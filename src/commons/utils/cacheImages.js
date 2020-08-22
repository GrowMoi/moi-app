import { Image } from 'react-native';
import { Asset } from 'expo-asset';

export default function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') return Image.prefetch(image);
    return Asset.fromModule(image).downloadAsync();
  });
}
