import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { name, img, seller, price, stock, key } = props.product
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-desc'>
                <h4 className='product-name'> <Link to={`/product/${key}`}>{name}</Link> </h4>
                <p><small> by {seller} </small></p>
                <p> Price {price} </p>
                <p><small> Only {stock} is left in stock. Order soon</small></p>
                {props.showAddToCart ? <button onClick={() => props.addToProductHandler(props.product)} className='cart-btn'> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button> : ''}
            </div>
        </div>
    );
};

export default Product;