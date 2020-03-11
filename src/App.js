import React from 'react';
import './App.css';
import { Provider} from 'react-redux'
import store from './redux/store'
import Topbar from './components/Topbar/Topbar'
import AppRouter from './components/AppRouter/AppRouter'
import {BrowserRouter as Router } from 'react-router-dom'


function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Topbar />
          <AppRouter />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
