import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router';
import { addItemToCart } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper';




const Card = ({
    product,
    addToCart = true,
    removeFromCart = false,
}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count)

    const addInCart = () => {
        addItemToCart(product, () => {
            setRedirect(true)
        })
    }

    const getARedirect = (redirect) => {
        if(redirect){
            return(
                <Redirect to="/cart"/>
            )
        }
    }

    const cardTitle = product ? product.name : "A photo from pexels"
    const cardDescription = product ? product.description : "-"
    const cardPrice = product ? product.price : "0"

    const showAddToCart = (addToCart) => {
        if(addToCart){
            return(
                <button
                onClick={()=> {addInCart()}}
                className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                Add to Cart
                </button>
            )
        }
    }

    const showRemoveFromCart = (removeFromCart) => {
        if(removeFromCart){
            return(<button
                onClick={() => {}}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                Remove from cart
                </button>)
        }
    }

    return (
        <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
            {getARedirect(redirect)}
            <ImageHelper product={product}/>
            <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
            <div className="row">
            <div className="col-12">
                {showAddToCart(addInCart)}
            </div>
            <div className="col-12">
                {showRemoveFromCart(removeFromCart)}
            </div>
            </div>
        </div>
        </div>
    );
};
  
export default Card;
 