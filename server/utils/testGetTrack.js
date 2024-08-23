// combinedTest.js
const getAccessToken = require('./getToken');
const {getTrack, getArtist, getArtistEvents } = require('./API');

(async () => {
  try {
      await getTrack('I can do it with a broken heart');
      await getTrack('Million Days');
    }
  catch (error) {
    console.error('Error:', error);
  }
})();

// (async () => {
//     try {
//         await getArtist('Taylor Swift');
//         await getArtist('BlackPink');
//       }
//     catch (error) {
//       console.error('Error:', error);
//     }
//   })();

// getArtistEvents('Taylor Swift').then(result => {
//   if (result.error) {
//     console.log(result.error);
//   } else {
//     console.log('Upcoming Events:', result);
//   }
// });
