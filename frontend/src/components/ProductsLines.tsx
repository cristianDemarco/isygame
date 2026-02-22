import { useEffect, useState } from "react";
import Product from "./Product";
import type { ProductDTO } from "../DTOs/ProductDTO";

const ProductsLines = ({page, setHasMore}: {page: number, setHasMore: (data: boolean) => void}) => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const LIMIT = 9;

    useEffect(() => {
            fetch(`/api/products?page=${page}&limit=${LIMIT}`)
                .then(response => response.json())
                .then(newProducts => {
                    setProducts([...products, ...newProducts]);
                    setHasMore(newProducts.length === LIMIT);
                })
                .catch((err) => {
                    console.log(err.message);
                })
        }, [page]);

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
        return (<div className="text-center">There are no products to display</div>)
    }
}
export default ProductsLines;