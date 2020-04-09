import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const product = fakeData
    // console.log(product);
    const addProductHandler = () => {
        fetch('http://localhost:4000/addProduct', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('Post successful', data)
            })
    }
    return (
        <div>
            <h2>Inventory coming soon...</h2>
            <button onClick={addProductHandler}>Add Inventory</button>
        </div>
    );
};

export default Inventory;