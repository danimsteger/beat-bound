// import React from 'react';
// import { useHistory } from 'react-router-dom';

const Home = () => {
  // const history = useHistory();

  // // const handleProfileClick = () => {
  // //   history.push('/login');
  // // };

  return (
    <div>
      <section>
        <h2> Featured Tracks</h2>
        <div>
          {/* tracks */}
        </div>
        <h2>Featured Playlists</h2>
        <div id="playlists">
          {/* TODO: Add featured playlists here */}
        </div>
      </section>
      <footer>
        <div id='now-playing'>
          {/* TODO: Add Now Playing bar here */}
        </div>
      </footer>
    </div>
  );
};

export default Home;
