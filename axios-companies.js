import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://stokr-beta.firebaseio.com/'
});

export default instance;
