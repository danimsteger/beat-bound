// import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
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
        <h2>My Saved Events</h2>
        <div>
          {/* TODO: Add saved events here */}
        </div>
      </section>
      <section>
        <h2>My Saved Artists</h2>
        <div>
          {/* TODO: Add saved artists here */}
        </div>
      </section>
      <section>
        <h2>My Saved Songs</h2>
        <div>
          {/* TODO: Add saved songs here */}
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

export default Profile;
