import React from 'react';
import './App.css';
import FileConfigurator from "./components/FileConfigurator/FileConfigurator";
import LiveConfigurator from "./components/LiveConfigurator/LiveConfigurator";

function App() {
  return (
    <div className="App">
      <h1>PtyWeb</h1>

      {/*<FileConfigurator />*/}
      <LiveConfigurator />
    </div>
  );
}

export default App;
