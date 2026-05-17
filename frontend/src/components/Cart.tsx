import { useState, useEffect } from "react";
import type { ProductDTO } from "../types/ProductDTO";
import CartProduct from "./CartProduct/CartProduct";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const token = localStorage.getItem("token");
    const options = {
        method:"GET",
        headers:{"Content-Type": "application/json", "Authorization":`Bearer ${token}`}
    }
    useEffect(() => {
                setLoading(true);
                fetch("/api/cart/products", options)
                    .then(response => response.json())
                    .then(data => {
                        setCartProducts([...data]);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
                    .finally(()=>{
                        setLoading(false);
                    })
        }, [refresh]);

    if(!cartProducts){
        return (
        <><div className="row my-5">
            <div className="col my-4 d-flex justify-content-around">
                {loading &&
                <>
                    <div className="spinner-border text-success" style={{width: "4rem", height:"4rem"}} role="status">
                        <span className="sr-only"></span>
                    </div>
                </>
                }
            </div>
        </div></>)
    }

    return (
            <>
                {cartProducts.length>0 ? <h1 className="row d-flex justify-content-center mt-5">Your Shopping Cart</h1>
                    :<h1 className="row d-flex justify-content-center mt-5">Your cart is empty!</h1>}
                <div className="container">
                    <div className="row my-5 d-flex justify-content-start">
                        <ul className="list-group">
                        {cartProducts.map((product) => (
                            <CartProduct cartProduct={product} key={product.id} onDelete={()=>setRefresh(!refresh)}/>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className="col text-center">
                    {cartProducts.length>0 && <button type="button" className="btn btn-success text-center mb-5 w-25 btn-lg" style={{fontSize: "clamp(1rem, 2.5vw, 1.8rem)"}}>Purchase</button>}
                </div>
            </>
        );
}

export default Cart;