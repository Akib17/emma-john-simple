import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { useAuth } from '../Login/useAuth';

const Header = () => {
    const auth = useAuth()
    return (
        <div className='header'>
            <img src={logo} alt="Logo" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Inventory</a>
                {
                    auth.user ?
                        <a href="/login" style={{color: 'orange'}}> {auth.user.name} </a> :
                        <a href="/login" style={{color: 'orange'}}>Sign In</a>
                }
            </nav>
        </div>
    );
};

export default Header;
