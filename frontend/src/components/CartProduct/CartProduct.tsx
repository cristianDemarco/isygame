import { useEffect, useState } from "react";
import type { ProductDTO } from "../../types/ProductDTO";
import "./cartProduct.css"

type CartProductProps = {
    cartProduct: ProductDTO;
    onDelete: ()=>void;
}

const CartProduct = ({cartProduct,onDelete}:CartProductProps) => {
    const [image, setImage] = useState<string | undefined>();
    const token = localStorage.getItem("token");
        
    useEffect(() => {
            fetch(`/api/products/${cartProduct.id}/image`)
                .then(response => response.blob())
                .then(blob => setImage(URL.createObjectURL(blob)))
                .catch((err) => {
                    console.log(err.message);
                })
        }, []);

    const handleDelete = () => {
        fetch(`/api/cart/${cartProduct.id}`, {
            method:"DELETE",
            headers:{"Content-Type": "application/json", "Authorization":`Bearer ${token}`}
        }).then(() => onDelete());
    }
    
    return (
        <>
            <li className="list-group-item d-flex align-items-center">
                <div className="col-2 col-md-2">
                    <img src={image} className="rounded img-thumbnail w-100"></img>
                </div>
                <div className="col-6 col-md-6">
                    <h2 className="text-start cart-item-name mx-3">{cartProduct.name}</h2>
                </div>
                <div className="col-2 col-md-2">
                    <h3 className="cart-item-price mx-2">{cartProduct.price}€</h3>
                </div>
                <div className="col-2 col-md-2">
                    <button type="button" className="btn button btn-danger mx-3" onClick={handleDelete}>
                        <i className="bi bi-trash cart-item-icon"></i>
                    </button>
                </div>
            </li>
        </>
    )
}

export default CartProduct;