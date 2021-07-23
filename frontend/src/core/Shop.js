import React, { Component } from "react";
import Layout from "./Layout";
import Card from "./Card";
// import { getAllProducts } from "./apiCore";

export class Shop extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            isLoaded: false
            // search: ""
        }
    }




    async componentDidMount() {

        try{
            const response = await fetch('http://localhost:3001/api/books',{
                method: "GET"
            });
            const bookList = await response.json();
            this.setState({products: bookList, isLoaded: true});
        }catch(err){
            console.log(err);
        }

        // await fetch('http://localhost:3001/api/books',
        // {
        //     method: "GET"
        // }).then(await (response) => response.json())
        // .then((bookList) => {
        //     console.log({products: bookList});
        //     this.setState({products: bookList})
        //     // console.log(this.state.products[0]);
        //     // console.log(this.state.products.data[0]);
        // }) 
    }

    handleChange = event => {
        this.setState({
            search: event.target.value
        })
    };
    renderProducts = (products) => (
        <>
            {/* <form className="mb-4">
                <span className="input-group-text"
                    style={{ backgroundColor: "black", borderRadius: "10px", height: "90px" }}>
                    <div className="input-group input-group-lg">
                        <input
                            type="search"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Search by name"
                            value={this.state.search}
                        />
                    </div>
                </span>
            </form> */}
            <h2 className="card-header mb-4"
                style={{ backgroundColor: "#DC143c", color: "white" }}>
                Products</h2>
            <div className="row">
                { console.log("products: ",products.data[0])}
                {products.data.map((product, i) => (
                    // console.log(product, i)
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
                {/* {var l = products.data.length} */}
            </div>
        </>
    )

    render() {
        const {products, isLoaded} = this.state;
        // let searchProducts = products.filter((item) => {
        //     return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        // })
        return (
            <>
                {console.log("is loading: ",isLoaded)}
                {!isLoaded ? <div>Loading....</div> : 
                    <Layout
                    className="container">
                        {console.log("p",products)}{this.renderProducts(products)}
                    </Layout>
                }
            </>
        )  
    }
}

export default Shop;
