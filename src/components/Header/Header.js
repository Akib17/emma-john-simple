import React, { Component } from 'react'
import logo from '../../images/logo.png'
import './Header.css'

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <img src={logo} alt="Logo" />
                <nav>
                    <a href="/shop">Shop</a>
                    <a href="/review">Order Review</a>
                    <a href="/manage">Manage Inventory</a>
                </nav>
            </div>
        )
    }
}