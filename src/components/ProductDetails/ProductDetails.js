import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useEffect } from 'react';
import { useState } from 'react';

const ProductDetails = () => {
    const { productKey } = useParams()
    const [product, setProduct] = useState(null)
    useEffect(() => {
        fetch('http://localhost:4000/product/' + productKey)
        .then(res => res.json())
            .then(data => {
            setProduct(data)
        })
    })
    return (
        <div>
            {
                product && <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetails;