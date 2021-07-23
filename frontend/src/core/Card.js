import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { addItem, updateItem, removeItem } from './cartHelpers';
import Cart from "../images/cart.png"
import Glass from "../images/search.png"
import RemoveFromCart from '../images/remove_cart.png'
import { isAuthenticated } from "../auth";
import {itemTotal} from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  // showQuantity = false,
  // showQuantityController = true,
  cartUpdate = false,
  showRemoveProductButton = true,
  setRun = f => f,
  run = undefined,
  changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [confirm_add, setConfirm]=useState(false);
  const [confirm_remove, setConfirmRem]=useState(false);
  const [emptyCart, setEmpty] = useState(false);
  const [count, setCount] = useState(0);
  const [deny, setDeny] = useState(false);
  


  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product.id}`} className="mr-2">
          <button className=" btn mt-2 mb-2" style={{ backgroundColor:"white"}}>
          <img src={Glass} alt="" width="50px" height="50px"/>
          </button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    if(isAuthenticated())
      addItem(product, setRedirect(false), setConfirm(true));
    else{
      // if(count === 0){
      //   alert('A book with 0 quantity cannot be added to the cart')
      // }
      // else{
        alert('Please Login to continue shopping')
      // }
    }
  };


  const removeFromCart = async () => {
    if(isAuthenticated()){
      // const user_id = isAuthenticated()['user_info'].id
      // const response = await fetch(`http://localhost:3001/api/checkout/${user_id}`);
      // const data = response.json();
      if(itemTotal() === 0)
        alert('Cannot remove from empty cart')
        // return (<div>{data['message']}</div>);
      else{
        // const response = await fetch(`http://localhost:3001/api/checkout`, {method: 'DELETE', body: {'user_id': user_id, 'book_id': product.book_id}});
        // const data = response.json();
        // return (<div>{data['message']}</div>);
        removeItem(product.book_id);
        window.location.reload(false);
        setConfirmRem(true);
      }
    }
    else{
      setDeny(true);
    }
  }


  


  // const showCount = showQuantityController => {
  //   return (
  //     showQuantityController && 
  //     <input onChange={event => {event.target.value < 6 ? setCount(event.target.value) : alert('We are sorry! Only 5 unit(s) allowed in each order')}} type="number" name="points" step="1" style={{width:"90px"}} class="mr-3" placeholder="Quantity" value = {count} max="5" />
  //   )
  // }

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const Confirm = confirm_add => {
    if(confirm_add) {
      return (
        <div className="alert alert-secondary" role="alert">
            Item has been added to your cart.
        </div>
      )
    }
  }

  const Deny = deny => {
    if(deny){
      return(
        <div className="alert alert-secondary" role="alert">
            Please Login / Register to continue Shopping
        </div>
      );
    }
  }



  const ConfirmRem = confirm_remove => {
    if(confirm_remove){
      return (
      <div className="alert alert-secondary" role="alert">Book Removed from the cart</div>
    )}
  }

  const ConfirmEmpty = emptyCart => {
    if(emptyCart){
      return(
        <div>Your Cart is empty</div>
      )
    }
  }


  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <Link  onClick={addToCart} className="btn btn-danger mt-2 mb-2 mr-2">
            <img src={Cart} alt="" width="40px" height="40px"/>
        </Link>
      )
    );
  };

  // const showStock = quantity => {
  //   if(quantity < 10 && quantity > 0){
  //     return (<span className="badge badge-secondary badge-pill">Hurry! Only { quantity } left</span>)
  //   }
  //   return quantity > 0 ? (
  //     <span className="badge badge-secondary badge-pill">In Stock </span>
  //   ) : (
  //     <span className="badge badge-danger badge-pill">Out of Stock</span>
  //   );
  // };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-secondary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    console.log(productId);
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product.book_id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <Link  onClick={removeFromCart} className="btn btn-danger mt-2 mb-2 ">
            <img src={RemoveFromCart} alt="remove" width="40px" height="40px"/>
        </Link>
        // <button
        //   onClick={() => {
        //     removeItem(product._id);
        //     setRun(!run); // run useEffect in parent Cart
        //   }}
        //   className="btn btn-outline-danger mt-2 mb-2"
        // >
        //   Remove Product
        // </button>
      )
    );
  };
  return ( 
    <>
<div class="card">
    <img class="mt-3 card-img-top" style={{width:"160px", height:"160px", marginLeft:"100px"}}
    src={product.image_url} 
    alt={product.book_name}/>
    <div class="card-body">
      {shouldRedirect(redirect)}
      {
        ConfirmEmpty(emptyCart)
      }
      {
        ConfirmRem(confirm_remove)
      }
      {
        Confirm(confirm_add)
      }
      {
        Deny(deny)
      }
      <h5 class="card-title">Title: {product.book_name}</h5>
      <h5 class="card-title">Grade: {product.grade}</h5>
      {/* <p class="card-text">By: {product.author}</p> */}
      <p class="card-text">Rs. {product.price}</p>
      {showStock(product.stock)}
      <br/>

      <div className="container ml-3">
          {/* {showCount(showQuantityController)} */}
          {/* {showViewButton(showViewProductButton)} */}
          {showAddToCartBtn(showAddToCartButton)}
          {showRemoveButton(showRemoveProductButton)}
      </div>

    

      {showCartUpdateOptions(cartUpdate)}
    </div>
</div>

<br/><br/>
</>
  );
};

export default Card;
