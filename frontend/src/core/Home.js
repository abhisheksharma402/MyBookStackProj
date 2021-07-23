import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from './Layout';
// import { getProducts } from './apiCore';
import Card from './Card';

const Home = () => {
    
    return (
        <Layout
            className="container">
            <div className="row mb-4">
                <div className="col-md-10">
                    <h2
                        style={{ backgroundColor: "#DC143c", color: "white", height: "40px" }}>
                        <h3 className="mt-3 ml-5">Schools</h3>
                    </h2>
                </div>
                {/* <div className="col-md-2 mt-3">
                    <Link to="/shop" className="btn btn-dark">
                        View All
                </Link>
                </div> */}
            </div>
            {/* <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div> */}
            <div className="row mb-4">
                <div className="col-md-10">
                    <h2
                        style={{ backgroundColor: "#DC143c", color: "white", height: "40px" }}>
                        <h3 className="mt-3 ml-5">Benefits</h3>
                    </h2>
                </div>
                {/* <div className="col-md-2 mt-3">
                    <Link to="/shop" className="btn btn-dark">
                        View All
                </Link>
                </div> */}
            </div>
            {/* <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div> */}

        </Layout>
    );
};

export default Home;
