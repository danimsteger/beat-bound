import React from "react";

import SavedEvents from "../components/profile/SavedEvents";

const Profile = () => {
  return (
    <div>
      <section>
        <SavedEvents></SavedEvents>
      </section>
      <section>
        <h2>My Saved Artists</h2>
        <div>{/* TODO: Add saved artists here */}</div>
      </section>
      <section>
        <h2>My Saved Songs!</h2>
        <div>{/* TODO: Add saved songs here */}</div>
      </section>
      <footer>
        <div>{/* TODO: Add Now Playing bar here */}</div>
      </footer>
    </div>
  );
};

export default Profile;
