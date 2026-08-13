import { useState, useEffect } from "react";
import type { ProductDTO } from "../types/ProductDTO";
import CartProduct from "./CartProduct/CartProduct";
import { useAuth } from "../context/AuthContext";
import { endpoints } from "../utils/endpoints";
import { ApiMethod } from "../types/ApiMethod";
import { formatDate } from "../utils/formatDate";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState<ProductDTO[]>([]);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { sendAuthRequest } = useAuth();

    useEffect(() => {
            setLoading(true);
            sendAuthRequest(ApiMethod.GET, endpoints.cart.products.all)
            .then(response => response.json())
            .then(data => {
                setCartProducts([...data]);
            })
            .finally(()=>{
                setLoading(false);
            })

            sendAuthRequest(ApiMethod.GET, endpoints.cart.lastUpdate)
            .then(response => response.json())
            .then(data => setLastUpdate(data.lastUpdate))
            .catch(err => console.log(err.message))
        }, [refresh]);

    const handleDeleteAll = () => {
        sendAuthRequest(ApiMethod.DELETE, endpoints.cart.products.all)
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
                {lastUpdate && <h4 className="row d-flex justify-content-center mt-3">Last update: {formatDate(lastUpdate)}</h4>}
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