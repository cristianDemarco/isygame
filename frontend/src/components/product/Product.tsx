import { useEffect, useState } from "react";
import {type ProductDTO} from "../../types/ProductDTO";
import {useAuth} from "../../context/AuthContext"
import "./product.css";

type ProductProps = {
    product: ProductDTO;
    onToggleCart: () => void;
}

const Product = ({product, onToggleCart}: ProductProps) => {
    const [image, setImage] = useState<string | undefined>();
    const {token} = useAuth();
    useEffect(() => {
            fetch(`/api/products/${product.id}/image`)
                .then(response => response.blob())
                .then(blob => setImage(URL.createObjectURL(blob)))
                .catch((err) => {
                    console.log(err.message);
                })
        }, []);

    const handleToggleCartButton = () => {
        if(token){
            console.log("`/api/cart/${product.id}`")
            fetch(`/api/cart/${product.id}`, {
                method:product.inCart?"DELETE":"POST",
                headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`}
            })
            .then(response => {
                if(!response.ok) throw new Error (`"Error while ${product.inCart?"deleting":"saving"} product from car"`);
                product.inCart=!product.inCart;
                onToggleCart();
            })
            .catch(err => {
                console.log(err.message);
            })
        }
    }

    return (
        <div className="card" style={{width: "18rem"}}>
            <img src={image} className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="d-inline">{product.price > 0 ? `Price: ${product.price}€` : "Free"}</h6>
                <p className="card-text">{product.description}</p>
            </div>
            <button id={product.inCart?"removeButton":"addButton"} type="button" className="btn button position-absolute top-0 end-0 border border-dark fs-4" onClick={handleToggleCartButton}>
                <i id="toggleCartIcon" className={"bi bi-" + (product.inCart?"trash":"bag-plus")}></i>
            </button>   
        </div>
    );
};

export default Product;