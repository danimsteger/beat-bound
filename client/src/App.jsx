import { useState, useEffect } from 'react';
// deleted the React call from above ^ -wjl
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ArtistPage from './pages/ArtistPage';
import EventPage from './pages/EventPage';
import Search from './pages/Search';
import FriendsFeed from './pages/FriendsFeed';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // TODO: Check user authentication (check JWT token)
    // setIsLoggedIn(true or false);
  }, []);

  const handleLogin = () => {
    // TODO: Implement login logic here
    setIsLoggedIn(true);
    history.push('/');
  };

  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/profile">
          {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/artist" component={ArtistPage} />
        <Route path="/event" component={EventPage} />
        <Route path="/search" component={Search} />
        <Route path="/friends-feed" component={FriendsFeed} />
      </div>
    </Router>
  );
};

export default App;
