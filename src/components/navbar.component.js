import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//simple navbar componenet, thanks bootstrap
export default class Navbar extends Component {

    render() {
        return (
        <nav className="navbar navbar-expand-xl navbar-light bg-light" id="sidenav">
                <Link to="/home" className="navbar-brand"><img id="navIcon" src={require("../images/producthuddleico.png")}></img>  Product Huddle</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/bugs" className="nav-link">Bug Board</Link>
              </li>
              <li className="navbar-item">
                <Link to="/designboard" className="nav-link">Design Board</Link>
              </li>
              <li className="navbar-item">
                <Link to="/feedback" className="nav-link">Live Meeting</Link>
              </li>
              <li className="navbar-item">
                <Link to="/user" className="nav-link">Team Management</Link>
              </li>
            </ul>
            </div>
          </nav>
        );
      }
    



}