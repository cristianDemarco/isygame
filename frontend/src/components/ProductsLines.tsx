import { useEffect, useState } from "react";
import Product from "./Product";
const ProductsLines = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
            fetch("/products?page=0&limit=9")
                .then(response => response.json())
                .then(setProducts)
                .catch((err) => {
                    console.log(err.message);
                })
        }, []);

    if(products.length > 0){
        return (
            <div className="container">
                <div className="row my-5 d-flex justify-content-start">
                    {products.map((value, index) => (
                        <div className="col-4 my-4 d-flex justify-content-around" key={index}>
                            <Product product={value}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (<div>Errore</div>)
    }
}
export default ProductsLines;