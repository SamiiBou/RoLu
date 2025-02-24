// src/App.js
import React from 'react';
import ChatComponent from './components/ChatComponent';
import MatchingComponent from './components/MatchingComponent';
import './App.css';
function App() {
  return (
    <div className="App">
      <header>
        <h1>Work Anywhere App</h1>
      </header>
      <main>
        <section>
          <ChatComponent />
        </section>
        <section>
          <MatchingComponent />
        </section>
      </main>
    </div>
  );
}
export default App;
