import React, { useState } from 'react';
// import { createOrder } from './apiCore';
import { getCart, emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '', 
        instance: {},
        address: '' 
    });

    const userId = isAuthenticated() && isAuthenticated().user_info.id;
    const token = isAuthenticated() && isAuthenticated().token;
    const cart_info = getCart();

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        console.log("ci ",cart_info);
        return products.reduce((currentValue, nextValue) => {
            // console.log("cv", currentValue);
            // console.log("nv", nextValue);
            // console.log(nextValue.count, nextValue.price);
            return Number(currentValue) + Number(nextValue.count) * Number(nextValue.price);
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <>
            <div>{showDropIn()}</div>
            </>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    let deliveryAddress = data.address;

    const buy = async () => {
        setData({ loading: true });

        const createOrderData = {
            products: products,
            amount: getTotal(),
            address: deliveryAddress
        };

        console.log("cod: ",JSON.stringify(createOrderData));   

        await fetch(`http://localhost:3001/api/order/${userId}`, 
        {method: 'POST', 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(createOrderData)
        })
        .then(response => response.json())
        .then(data => {
            // window.alert(response.json);
            console.log(data);
            if(JSON.stringify(data['message'])){
                emptyCart();
                setData({
                    ...data,
                    loading: false,
                    success: true
                });
                window.alert(JSON.stringify(data['message']))
                window.location.reload(false);
            }
        }).catch(error => {
            console.log(error);
            setData({ loading: false });
        });

    }
    const ut = {
        "background-color":"#aaa",
        "color":"#fff"
    }
    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            { products.length > 0 ? (
                <div>
                    <div className="form-group mb-3">
                        <label>Delivery address:</label>
                        <input 
                            type = 'text'
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Enter your delivery address" 
                        />
                        
                    </div>
                    <h2 className="mb-3 text-center bg-warning">Total: Rs. {getTotal()}</h2>
                    <button onClick={buy} className="btn btn-success btn-block">
                        Place order
                    </button>
                </div>
            ) : null }
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            
            {showLoading(data.loading)}
            {showError(data.error)}
            {showCheckout()}
            
        </div>
    );
};

export default Checkout; 