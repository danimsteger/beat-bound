const fetch = require('node-fetch');

let accessToken = {
    value: null,
    expiry: null
};

function fetchAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basicAuth}`
        },
        body: 'grant_type=client_credentials'
    })
    .then(response => response.json())
    .then(data => {
        accessToken.value = data.access_token;
        accessToken.expiry = Date.now() + data.expires_in * 1000;
        return accessToken.value;
    });
}

function getAccessToken() {
    // Check if the current token is valid
    if (!accessToken.value || Date.now() >= accessToken.expiry) {
        return fetchAccessToken(); // Fetch a new token if it's expired
    }
    return Promise.resolve(accessToken.value); // Return existing token if it's still valid
}

let token = getAccessToken();
console.log(token);

module.exports = getAccessToken;
