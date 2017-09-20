const extractIdFromUrl = url => url.match(/v\=(\w)/)[1];

export default {
  extractIdFromUrl,
};
