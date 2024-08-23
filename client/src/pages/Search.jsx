import { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('track');
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    let endpoint;
    switch (searchType) {
      case 'track':
        endpoint = `/api/search/track?q=${encodeURIComponent(searchTerm)}`;
        break;
      case 'artist':
        endpoint = `/api/search/artist?q=${encodeURIComponent(searchTerm)}`;
        break;
      case 'events':
        endpoint = `/api/search/artist-events?q=${encodeURIComponent(searchTerm)}`;
        break;
      default:
        return;
    }

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Search</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="track">Track</option>
          <option value="artist">Artist</option>
          <option value="events">Events</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {results && (
          <pre>{JSON.stringify(results, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default Search;
