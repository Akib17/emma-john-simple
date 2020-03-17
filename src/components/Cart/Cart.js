import React from 'react';

const Cart = (props) => {
    const cart = props.cart
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0)

    let shippingCost = 0
    if (totalPrice > 400) {
        shippingCost = 0
    }
    else if (totalPrice > 200) {
        shippingCost = 2.99
    } else if (totalPrice > 100) {
        shippingCost = 4.99
    } else if (totalPrice > 35) {
        shippingCost = 6.99
    } else if (totalPrice > 0) {
        shippingCost = 7.99
    }

    const tax = totalPrice / 15

    const precission = (num) => num.toFixed(2)

    return (
        <div>
            <h3>Order Summary : {cart.length} </h3>
            <h3> Product Price : {precission(totalPrice)} </h3>
            <p><small> Shipping Cost : {shippingCost} </small></p>
            <p><small> Tax : {precission(tax)} </small></p>
            <h3>Total Price : {precission(totalPrice + shippingCost + tax)} </h3>
            {
                props.children
            }
        </div>
    );
};

export default Cart;