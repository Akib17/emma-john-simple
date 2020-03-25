import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import thankYouImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const auth = useAuth()
    const [cart, setCart] = useState([]);
    const [review, setReview] = useState(false);

    const removeItem = (productKey) => {
        const newCart = cart.filter(item => item.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        const counts = productKeys.map(k => {
            const products = fakeData.find(pd => pd.key === k)
            products.quantity = saveCart[k]
            return products
        })
        setCart(counts)
    }, [])

    const reviewHandler = () => {
        setCart([])
        setReview(true)
        processOrder()
    }

    let thankYou;
    if (review) {
        thankYou = <img src={thankYouImage} alt="Thank you Image" />
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItems key={pd.key} product={pd} removeItem={removeItem}></ReviewItems>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="shipment">
                        {
                            auth.user ?
                                <button onClick={reviewHandler} className="cart-btn">Proceed to checkout</button>
                                :
                                <button onClick={reviewHandler} className="cart-btn">Login to proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;