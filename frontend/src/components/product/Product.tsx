import { useEffect, useState } from "react";
import { type ProductDTO } from "../../types/ProductDTO";
import { useAuth } from "../../context/AuthContext";
import "./product.css";
import { sendRequest } from "../../hooks/useApi";
import { ApiMethod } from "../../types/ApiMethod";
import { endpoints } from "../../utils/endpoints";

type ProductProps = {
    product: ProductDTO;
    showAlert: () => void;
}

const Product = ({ product, showAlert }: ProductProps) => {
    const [image, setImage] = useState<string | undefined>();
    const { accessToken, cartIds, addToCart, removeFromCart, sendAuthRequest} = useAuth();
    const inCart = cartIds.has(product.id);

    useEffect(() => {
            sendRequest(ApiMethod.GET, endpoints.products.product.image(product.id))
            .then(response => response.blob())
            .then(blob => setImage(URL.createObjectURL(blob)))
        }, []);

    const handleToggleCartButton = () => {
        if (!accessToken) {
            showAlert();
            return;
        }

        sendAuthRequest(inCart ? ApiMethod.DELETE : ApiMethod.POST, endpoints.cart.products.product(product.id))
        .then(response => {
            if (!response.ok) throw new Error(`Error while ${inCart ? "removing" : "adding"} product`);
            if (inCart) removeFromCart(product.id);
            else addToCart(product.id);
        })
        .catch(err => console.log(err.message));
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={image} className="card-img-top"/>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="d-inline">{product.price > 0 ? `Price: ${product.price}€` : "Free"}</h6>
                <p className="card-text">{product.description}</p>
            </div>
            <button
                id={inCart ? "removeButton" : "addButton"}
                type="button"
                className="btn button position-absolute top-0 end-0 border border-dark fs-4"
                onClick={handleToggleCartButton}
            >
                <i id="toggleCartIcon" className={"bi bi-" + (inCart ? "trash" : "cart")} />
            </button>
        </div>
    );
};

export default Product;