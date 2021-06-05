const axios = require('axios');

exports.axiosPost = (url, data) => axios.post(url, data);
exports.axiosGet = url => axios.get(url);
