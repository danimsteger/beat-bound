const fetch = require('node-fetch');
const getAccessToken = require('./getToken');

async function getTrack(trackQuery) {
  try {
    // const accessToken = await getAccessToken(); // Get the access token
    const accessToken =
      'BQC2g56mBNmpXDdS-7Vgg0q5ycgtqD77SyKeNU09OBtAB9kkbd5nOh9tisWZf2WOcDtLtTi0PkWvmbMuSRA_SyNwI8DmGPP0PI1xlJ9snFdPPvUQaQg';
    // const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(trackQuery)}&type=track&limit=1`;
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      trackQuery
    )}&type=track&limit=1&offset=0`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (data.tracks && data.tracks.items.length > 0) {
      const track = data.tracks.items[0];
      console.log('Track Name:', track.name);
      console.log(
        'Artists:',
        track.artists.map((artist) => artist.name).join(', ')
      );
      console.log('Album:', track.album.name);
      console.log('Preview URL:', track.preview_url);
      console.log('External URL:', track.external_urls.spotify);
    } else {
      console.log('No tracks found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

getTrack('Long Live');
