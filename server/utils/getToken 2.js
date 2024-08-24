const path = require("path");
// require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require("dotenv").config();
const fetch = require("node-fetch");

let accessToken = {
  value: null,
  expiry: null,
};
const TOKEN_EXPIRY_BUFFER = 30 * 1000;

async function fetchAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  if (data.access_token && data.expires_in) {
    const expiresInMs = data.expires_in * 1000; // Convert seconds to milliseconds
    accessToken.value = data.access_token;
    accessToken.expiry = Date.now() + expiresInMs;
    console.log("Token Expiry Time (ms):", accessToken.expiry); // Debug: Log the correct expiry time
    return accessToken.value;
  } else {
    throw new Error("Failed to obtain access token");
  }
}

function getAccessToken() {
  if (!accessToken.value || Date.now() >= accessToken.expiry - TOKEN_EXPIRY_BUFFER) {
    console.log("Token expired or doesn't exist. Fetching a new one.");
    return fetchAccessToken();
  }
  console.log("Reusing existing token.");
  return Promise.resolve(accessToken.value);
}

module.exports = getAccessToken;
