import React from 'react';
import './App.css';
import {Link, Outlet} from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/purchase">Purchase</Link>
          </li>
          <li>
            <Link to="/my-orders">My Orders</Link>
          </li>
          <li>
            <Link to="/sell">Sell</Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </>
  );
}

export default App;
