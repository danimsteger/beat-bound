// combinedTest.js
const getAccessToken = require('./getToken');
const {getTrack, getArtist, getArtistEvents, getFeaturedPlaylists, getArtistFeaturedTracks, getRelatedArtists } = require('./API');

// (async () => {
//   try {
//       await getTrack('I can do it with a broken heart');
//       await getTrack('Million Days');
//     }
//   catch (error) {
//     console.error('Error:', error);
//   }
// })();

// (async () => {
//     try {
//         await getArtist('Taylor Swift');
//       }
//     catch (error) {
//       console.error('Error:', error);
//     }
//   })();

// getArtistEvents('Taylor Swift').then(result => {
//   if (result.error) {
//     console.log(result.error);
//   } else {
//     // console.log('Upcoming Events:', result);
//     console.log('it worked')
//   }
// });

// getFeaturedPlaylists().then(result =>{
//   if (result.error) {
//     console.log(result.error);
//   } else {
//     console.log('featured playlists data: ', result);
//   }
// }) 

// getArtistFeaturedTracks('06HL4z0CvFAxyc27GXpf02').then(result => {
//   if (result.error) {
//     console.log(result.error);
//   } else {
//     console.log('Artist Featured songs: ', result);
//   }
// })

getRelatedArtists('06HL4z0CvFAxyc27GXpf02').then(result => {
  if (result.error) {
    console.log(result.error);
  } else {
    console.log('Related Artists: ', result);
  }
})