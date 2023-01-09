import React from 'react';
import {NavLink} from "react-router-dom";
import "./Header.css"

const Header = () => {
  return (
    <div>
      <nav className={"header"}>

        <NavLink to="/live" className={({isActive}) =>
          isActive ? "is-active" : undefined
        }>Live</NavLink>

        <NavLink to="/file" className={({isActive}) =>
          isActive ? "is-active" : undefined
        }>File</NavLink>

      </nav>

      <h1>PtyWeb</h1>
    </div>
  );
};

export default Header;
