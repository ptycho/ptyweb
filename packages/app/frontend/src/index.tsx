import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import ReactModal from "react-modal";
import {BrowserRouter as Router} from 'react-router-dom';

const rootDomElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootDomElement);

ReactModal.setAppElement(rootDomElement)

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
