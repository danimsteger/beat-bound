// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.jsx';
// import { BrowserRouter as Router } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import ArtistPage from './pages/ArtistPage.jsx'
import EventPage from './pages/EventPage.jsx'
import FriendsFeed from './pages/FriendsFeed.jsx'
import Profile from './pages/Profile.jsx'

import Login from './pages/Login.jsx';




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/ArtistPAge',
        element: <ArtistPage />
      },{
        path: '/EventPage',
        element: <EventPage />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)



// const Main = () => {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// };

// ReactDOM.render(<Main />, document.getElementById('root'));
