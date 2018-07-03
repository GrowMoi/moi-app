const isEmpty = (obj = {}) => {
  if(typeof obj === 'object') {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  throw new Error(`This type is not a valid object`);
}

export default {
  isEmpty,
};
