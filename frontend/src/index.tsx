import React from 'react';
import {render} from 'react-dom'
import './index.css';
import App from './App';
import ReactModal from "react-modal";

const rootDomElement = document.getElementById('root') as HTMLElement

ReactModal.setAppElement(rootDomElement)

render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>, rootDomElement
);
