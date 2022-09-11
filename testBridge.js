const axios = require('axios');

const credentials = {
    "user": "BankinUser",
    "password": "12345678"
}

const basicAuthentification = "BankinClientId:secret";
let buffer = new Buffer.from(basicAuthentification);
const base64Authentification = buffer.toString('base64');

console.log(base64Authentification);

const login = async() => {
    const accessToken = axios.post("http://localhost:3000/login", credentials,  {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${base64Authentification}`
        }
    }).then((response) => {
        return response.data.refresh_token;
    })
    return accessToken;
}

const token = async(refreshToken) => {
    axios.post(`http://localhost:3000/token?grant_type=refresh_token&refresh_token=${refreshToken}`,  {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then((response) => {
        console.log(response.data.access_token);
    })
}

const accounts = async(access_token) => {
    console.log(access_token);
    axios.get("http://localhost:3000/accounts",  {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    }).then((response) => {
        console.log(response)
    })
}

token("102e3d52634528ffbce40da8bec1bb6f01a8a693d3da15bbd3afdd28b50a08a916fb10bb881ceecb66c5717c4c0b4dab52edd44b7c739c5613665b0d10ba0efc").then(res => console.log(res));