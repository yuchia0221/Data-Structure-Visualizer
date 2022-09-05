import Axios from "axios";

const dotenv = require("dotenv");
dotenv.config();

let baseURL;
if (process.env.NODE_ENV === "development") {
    baseURL = "http://localhost:5000";
} else {
    baseURL = "https://henhen.azurewebsites.net/";
}

const axios = Axios.create({
    baseURL: baseURL,
});

export default axios;
