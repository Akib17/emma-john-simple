import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const auth = useAuth()
    const [cart, setCart] = useState([]);

    const removeItem = (productKey) => {
        const newCart = cart.filter(item => item.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const saveCart = getDatabaseCart()
        // console.log(saveCart)
        const productKeys = Object.keys(saveCart)
        // console.log(productKeys)
        fetch('http://localhost:4000/productByKey', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                const counts = productKeys.map(k => {
                    const products = data.find(pd => pd.key === k)
                    // console.log(products)
                    products.quantity = saveCart[k]
                    return products
                })
                setCart(counts)
                // console.log(counts)
            })
    }, [])

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItems key={pd.key} product={pd} removeItem={removeItem}></ReviewItems>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="shipment">
                        {
                            auth.user ?
                                <button className="cart-btn">Proceed to checkout</button>
                                :
                                <button className="cart-btn">Login to proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;