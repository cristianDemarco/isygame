import { useState, useEffect } from "react";
import type { ProductDTO } from "../types/ProductDTO";
import CartProduct from "./CartProduct/CartProduct";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { sendAuthRequest } = useAuth();

    useEffect(() => {
            setLoading(true);
            sendAuthRequest("GET", "cart/products")
            .then(response => response.json())
            .then(data => {
                setCartProducts([...data]);
            })
            .finally(()=>{
                setLoading(false);
            })
        }, [refresh]);

    const handleDeleteAll = () => {
        sendAuthRequest("DELETE", "cart/all")
        .then(response => response.json())
        .catch(err => console.log(err.message))
        .finally(() => setRefresh(!refresh));
    }

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
                <div className="col d-flex justify-content-center gap-5">
                    {cartProducts.length>0 && <button type="button" className="btn btn-success mb-5 btn-md" style={{fontSize: "clamp(1rem, 2.5vw, 1.8rem)"}}>Purchase</button>}
                    {cartProducts.length>0 && <button type="button" className="btn btn-danger mb-5 btn-md" style={{fontSize: "clamp(1rem, 2.5vw, 1.8rem)"}} onClick={handleDeleteAll}>Delete all</button>}
                </div>
            </>
        );
}

export default Cart;