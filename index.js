// Encode your client credentials
const clientId = 'b6f13b8c773c4f6a92febacd4723d35b'; // Replace with your client ID
const clientSecret = '6777116b31be4ca093a8e44844c60dfd'; // Replace with your client secret

// Basic auth credentials must be base64 encoded
const basicAuth = btoa(`${clientId}:${clientSecret}`);

// Prepare the fetch options
const fetchOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${basicAuth}` // Basic auth header
  },
  body: 'grant_type=client_credentials'
};

// URL for the token request
const tokenUrl = 'https://accounts.spotify.com/api/token';

// Fetch the token
fetch(tokenUrl, fetchOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Token:', data.access_token);
  })
  .catch(error => {
    console.error('Error:', error);
  });
