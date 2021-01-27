import axios from "axios";


const instance = axios.create({
    baseURL: 'http://rumeh.com:9000/api/',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});

export default instance;