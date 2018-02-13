import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import App from '../components/App';
import App from '../containers/App';

const Root = () => {
  return (
    <Router>
        <div>
            <Route path="/" component={App} />
        </div>
    </Router>
  );
};

export default Root;
