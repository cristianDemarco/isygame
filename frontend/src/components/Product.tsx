import { useEffect, useState } from "react";
import {type ProductDTO} from "../DTOs/ProductDTO";

type ProductProps = {
    product: ProductDTO;
}

const Product = ({product}: ProductProps) => {
    const [image, setImage] = useState<string | undefined>();
    
        useEffect(() => {
                fetch(`/api/products/${product.id}/image`)
                    .then(response => response.blob())
                    .then(blob => setImage(URL.createObjectURL(blob)))
                    .catch((err) => {
                        console.log(err.message);
                    })
            }, []);

    return (
        <div className="card" style={{width: "18rem"}}>
            <img src={image} className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="d-inline">{product.price > 0 ? `Price: ${product.price}€` : "Free"}</h6>
                <p className="card-text">{product.description}</p>
            </div>
        </div>
    );
};

export default Product;