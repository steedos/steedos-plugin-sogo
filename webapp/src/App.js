import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './stores/configureStore'
import SelectUsers from './components/select_users'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SelectUsers />
      </Provider>
    </div>
  );
}

export default App;
