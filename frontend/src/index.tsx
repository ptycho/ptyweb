import React from 'react';
import {render} from 'react-dom'
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import ReactModal from "react-modal";

const rootDomElement = document.getElementById('root') as HTMLElement

// const root = ReactDOM.createRoot(rootDomElement);
//
ReactModal.setAppElement(rootDomElement)

render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>, rootDomElement
);
