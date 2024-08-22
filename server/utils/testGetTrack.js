// combinedTest.js
const getAccessToken = require('./getToken');
const {getTrack, getArtist } = require('./API');

// (async () => {
//   try {
//     // First, test the token reuse
//     const firstToken = await getAccessToken();
//     console.log('First Token:', firstToken);

//     // Wait a few seconds and test token reuse again
//     setTimeout(async () => {
//       const secondToken = await getAccessToken();
//       console.log('Second Token:', secondToken);
      
//       if (firstToken === secondToken) {
//         console.log('Token reused successfully!');
//       } else {
//         console.log('A new token was generated.');
//       }

//       // Now, test getTrack functionality
//       await getTrack('I can do it with a broken heart');
//       await getTrack('Million Days');
//     }, 5000);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();

(async () => {
    try {
      // First, test the token reuse
      const firstToken = await getAccessToken();
      console.log('First Token:', firstToken);
  
      // Wait a few seconds and test token reuse again
      setTimeout(async () => {
        const secondToken = await getAccessToken();
        console.log('Second Token:', secondToken);
        
        if (firstToken === secondToken) {
          console.log('Token reused successfully!');
        } else {
          console.log('A new token was generated.');
        }
  
        // Now, test getArtist functionality
        await getArtist('Taylor Swift');
        await getArtist('BlackPink');
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
