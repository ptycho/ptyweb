import React from 'react';
import {render} from 'react-dom'
import './index.css';
import App from './App';
import ReactModal from "react-modal";
import {
  BrowserRouter as Router,
  Route,
  Link, Routes
} from 'react-router-dom';
import FileConfigurator from "./components/FileConfigurator/FileConfigurator";
import LiveConfigurator from "./components/LiveConfigurator/LiveConfigurator";

const rootDomElement = document.getElementById('root') as HTMLElement

ReactModal.setAppElement(rootDomElement)

render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>, rootDomElement
);
