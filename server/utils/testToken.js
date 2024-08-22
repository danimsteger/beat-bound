const getAccessToken = require('./getToken');

(async () => {
  try {
    // First call: should fetch a new token
    const firstToken = await getAccessToken();
    console.log('First Token:', firstToken);

    // Wait a few seconds (less than token expiry) and call again
    setTimeout(async () => {
      const secondToken = await getAccessToken();
      console.log('Second Token:', secondToken);
      
      if (firstToken === secondToken) {
        console.log('Token reused successfully!');
      } else {
        console.log('A new token was generated.');
      }
    }, 5000); // Wait 5 seconds before re-checking the token
  } catch (error) {
    console.error('Error fetching token:', error);
  }
})();