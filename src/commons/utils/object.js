const isEmpty = (obj = {}) => {
  if(typeof obj === 'object') {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  throw new Error(`This type is not a valid object`);
}

const sortObjectsByKey = (array = [], key = '', order = 'ASC') => {
  return array.sort((a, b) => {
    if (a[key] > b[key]) {
      return order === 'DESC' ? -1 : 1;
    }
    if (a[key] < b[key]) {
      return order === 'DESC' ? 1 : -1;
    }
    // a must be equal to b
    return 0;
  });
}


export default {
  isEmpty,
  sortObjectsByKey,
};
