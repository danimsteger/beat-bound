async function getTrack(trackQuery) {
    try {
        const accessToken = await getAccessToken();
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(trackQuery)}&type=track&limit=1&offset=0`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        if (data.tracks && data.tracks.items.length > 0) {
            const track = data.tracks.items[0];
            console.log('Track Name:', track.name);
            console.log('Artists:', track.artists.map(artist => artist.name).join(', '));
            console.log('Album:', track.album.name);
            console.log('Preview URL:', track.preview_url);
            console.log('External URL:', track.external_urls.spotify);
        } else {
            console.log('No tracks found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = getTrack;