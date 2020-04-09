import React from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentFinished, setPaymentFinished] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        //   console.log('Payment successful', error, paymentMethod)
        if (error) {
            setPaymentError(error.message)
            setPaymentFinished(null)
        } else {
            const paymentDetails = {id: paymentMethod.id, last4: paymentMethod.card.last4}
            setPaymentFinished(paymentMethod)
            props.handlePlaceOrder(paymentDetails)
            setPaymentError(null)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe} className="btn btn-info">
                Pay
            </button>
            {
                paymentError && <p style={{color: 'red'}}> {paymentError} </p>
            } 
            {
                paymentFinished && <p style={{color: 'green'}}> Payment successful </p>
            }
        </form>
    );
};

export default CheckoutForm