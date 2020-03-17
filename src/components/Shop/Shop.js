import React, { useEffect } from 'react';
import fakeData from '../../fakeData';
import { useState } from "react";
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const first10 = fakeData.slice(0, 10)
    const [products, setProducts] = useState(first10)
    const [cart, setCart] = useState([])
    useEffect(() => {
        const saveProduct = getDatabaseCart()
        const productKeys = Object.keys(saveProduct)
        const newProducts = productKeys.map(k => {
            const getProducts = fakeData.find(pdKey => pdKey.key === k)
            getProducts.quantity = saveProduct[k]
            return getProducts
        })
        setCart(newProducts)
    }, [])
    const addToProductHandler = (product) => {
        const someProducts = cart.find(pd => pd.key === product.key)
        let count = 1
        let newCart
        if (someProducts) {
            count = someProducts.quantity + 1
            someProducts.quantity = count
            const otherProducts = cart.filter(pd => pd.key !== product.key)
            newCart = [...otherProducts, product]
        }
        else {
            product.quantity = 1
            newCart = [...cart, product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product key={product.key} showAddToCart={true} addToProductHandler={addToProductHandler} product={product} />)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} >
                    <Link to="/review"><button className="cart-btn">Order review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;