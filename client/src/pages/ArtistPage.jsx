// import React from 'react';
import { useHistory } from 'react-router-dom';

const ArtistPage = () => {
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/login');
  };

  return (
    <div>
      <header>
        <h1>BeatBound 🎵</h1>
        <input type="text" placeholder="Search..." />
        <nav>
          <button>Home / Explore</button>
          <button onClick={handleProfileClick}>My Profile</button>
        </nav>
      </header>
      <section>
        <h2>Artist Name</h2>
        <div>
          {/* TODO: Add artist image and top songs here */}
        </div>
      </section>
      <section>
        <h2>Related Artists</h2>
        <div>
          {/* TODO: Add related artists here */}
        </div>
      </section>
      <section>
        <h2>Upcoming Events</h2>
        <div>
          {/* TODO: Add upcoming events here */}
        </div>
      </section>
      <footer>
        <div>
          {/* TODO: Add Now Playing bar here */}
        </div>
      </footer>
    </div>
  );
};

export default ArtistPage;
