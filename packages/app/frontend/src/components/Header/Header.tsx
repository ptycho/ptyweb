import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/live">Live</Link>
          </li>
          <li>
            <Link to="/file">File</Link>
          </li>
        </ul>
      </nav>

      <h1>PtyWeb</h1>
    </div>
  );
};

export default Header;
