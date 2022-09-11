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

const getToken = async(refreshToken) => {
    const stringRefreshToken = `grant_type=refresh_token&refresh_token=${refreshToken}`;
    const refresh_token = axios.post(`http://localhost:3000/token`, stringRefreshToken, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then((response) => {
        console.log(response.data.access_token);
        return response.data.access_token;
    })
    return refresh_token;
}

const getAccounts = async(access_token) => {
    console.log(access_token);
    const accounts = axios.get("http://localhost:3000/accounts",  {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    }).then((response) => {
        return response.data.account;
    })
    return accounts;
}

const transactions = async(account_number, access_token) => {
    console.log(access_token);
    const transactions = axios.get(`http://localhost:3000/accounts/${account_number}/transactions`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    }).then((response) => {
        console.log(response.data)
        return response.data;
    })
    return transactions
}

const test = async() => {
    const accessToken = await login().then(res => getToken(res));
    const accounts = await getAccounts(accessToken);
    const transactions = accounts.map((account) => {
        const result = {
            acc_number: account.acc_number,
            amount: account.amount,
        }
        return result;
    });
    console.log(transactions);
}

test();