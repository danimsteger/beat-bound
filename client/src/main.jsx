import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const Main = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
