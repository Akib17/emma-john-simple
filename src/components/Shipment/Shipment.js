import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm()
  const [shipmentAdded, setShipmentAdded] = useState(null);
  const [shipmentInfo, setShipmentInfo] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const stripePromise = loadStripe('pk_test_I3DawRGmht9FhGAI2lVXSobT007W7V7dzP');
  const onSubmit = data => {
    setShipmentInfo(data)
  }

  const handlePlaceOrder = (payment) => {
    const savedCart = getDatabaseCart()
    const orderDetails = {
      email: auth.user.email,
      cart: savedCart,
      shipment: shipmentInfo,
      payment: payment
    }
    // console.log(orderDetails)
    fetch('http://localhost:4000/orderPlaced', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        setShipmentInfo(data)
        setPaymentSuccess(data._id)
      })
      .catch(err => console.log(err.message))
  }

  const auth = useAuth()

  return (
    <div className="container">
      <div className="row">
        <div style={{ display: shipmentInfo && 'none' }} className="col-md-8 offset-md-2">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>

            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email" />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address1" ref={register({ required: true })} placeholder="Address" />
            {errors.address1 && <span className="error">Address 1 is required</span>}

            <input name="city" ref={register({ required: true })} placeholder="City" />
            {errors.city && <span className="error">City is required</span>}

            <input name="zipcode" ref={register({ required: true })} placeholder="Zip code" />
            {errors.zipcode && <span className="error">Zip code is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Phone number" />
            {errors.phone && <span className="error">Phone Number is required</span>}

            <input type="submit" />
          </form>
        </div>
        <div style={{ display: shipmentInfo ? 'block' : 'none' }} className="col-md-8 offset-md-2">
          <h2>Checkout Form</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
          </Elements>
          <br />
          {
            paymentSuccess && <h3 className="text-success"> Thanks you shopping with us. Your order id is {paymentSuccess} </h3>
          }
        </div>
      </div>
    </div>
  )
};

export default Shipment;