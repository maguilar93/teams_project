import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import React from 'react';
import Teams from './components/teams';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>Hello there</div>
      </header>
      <body className="App-body">
        <Teams />
      </body>
    </div>
  );
}

export default App;
