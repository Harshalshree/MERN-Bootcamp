import React, {useState, useEffect} from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/CartHelper'

const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(()=>{
        setProducts(loadCart())
    },[reload])
    
    const loadAllProducts = () => {
        return(
            <div>
                <h2>This section is to load products</h2>
                {products.map((product, index) => (
                    <Card
                    key={index}
                    product={product}
                    addToCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                    />
                ))}
            </div>
        )
    } 

    const loadCheckout = () => {
        return(
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    }

    return(
        <Base title="CartPage" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">
                    {loadAllProducts()}
                </div>
                <div className="col-6">
                    {loadCheckout()}
                </div>
            </div>
        </Base>
    )
}

export default Cart