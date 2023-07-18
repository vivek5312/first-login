import { useContext } from 'react';
import React from 'react';
import Authenticate from '../Store/auth-context';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  let context= useContext(Authenticate)
  return (
   
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIN && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {context.isLoggedIN&& (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {context.isLoggedIN && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
