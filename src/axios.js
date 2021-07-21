import axios from 'axios';

const instance = axios.create({
    baseURL:"https://burger-builder-39bca.firebaseio.com/"
});

export default instance;