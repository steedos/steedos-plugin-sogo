import React from 'react';
import logo from './logo.svg';
import './App.css';

import Organizations from './containers/organizations'
import Users from './containers/users/'

function App() {
  return (
    <div className="App">
      <Organizations />
      <Users />
    </div>
  );
}

export default App;
