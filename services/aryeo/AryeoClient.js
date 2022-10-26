import axios from "axios";

const aryeoClient = axios.create({
    baseURL: `https://api.aryeo.com/v1`,
});

export default aryeoClient;
