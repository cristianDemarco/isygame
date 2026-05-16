import { useEffect, useState } from "react";
import type { ProductDTO } from "../types/ProductDTO";

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
                <div className="col-3">
                    <img src={image} className="rounded img-thumbnail w-50"></img>
                </div>
                <div className="col-5">
                    <h2 className="text-start">{cartProduct.name}</h2>
                </div>
                <div className="col-2">
                    <h3>{cartProduct.price}€</h3>
                </div>
                <div className="col-2">
                    <button type="button" className="btn button btn-danger" onClick={handleDelete}>
                        <i className="bi bi-trash fs-3"></i>
                    </button>
                </div>
            </li>
        </>
    )
}

export default CartProduct;