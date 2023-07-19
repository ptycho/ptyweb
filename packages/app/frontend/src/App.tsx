import React from 'react';
import FileConfigurator from "./components/FileConfigurator/FileConfigurator";
import LiveConfigurator from "./components/LiveConfigurator/LiveConfigurator";
import {Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import '@h5web/lib/styles.css';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/live" element={<LiveConfigurator/>}/>
        <Route path="/file" element={<FileConfigurator/>}/>
        <Route path="*" element={<Navigate to={"/live"} replace />}/>
      </Routes>
    </div>
  );
}

export default App;
