import React from 'react';

const ReviewItems = (props) => {
    const { name, quantity, key, img, price, seller } = props.product
    const reviewItemsStyle = {
        borderBottom: '1px solid lightGray',
        width: '60%',
        paddingBottom: '20px'
    }
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-desc'>
                <h5 className="product-name"> {name} </h5>
                <p> Price: {price} </p>
                <p>Quantity: <strong>({quantity})</strong> </p>
                <button onClick={() => props.removeItem(key)} className="cart-btn">Remove</button>
            </div>
        </div>
    );
};

export default ReviewItems;