import React, { Component } from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
    render() {
        return (
            <div className='Navbar-items'>
               <h1 className='movies'><Link to="/">Movies App</Link></h1>
               <h4 className='favourite'><Link to="/favourites">Favourites</Link></h4> 
            </div>
        )
    }
}
