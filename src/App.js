import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './Components/MenuComponent'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">My Restaurant</NavbarBrand>
        </div>
      </Navbar>
      <Menu/>
    </div>
  );
}

export default App;
