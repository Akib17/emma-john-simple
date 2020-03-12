import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props)
    const { name, img, seller, price, stock } = props.product
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-desc'>
                <h4 className='product-name'> {name} </h4>
                <p><small> by {seller} </small></p>
                <p> Price {price} </p>
                <p><small> Only {stock} is left in stock. Order soon</small></p>
                <button onClick={() => props.addToProductHandler(props.product)} className='cart-btn'> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;