import { useEffect, useState } from "react";
import Product from "./product/Product";
import type { ProductDTO } from "../types/ProductDTO";

const ProductsLines = ({page, setHasMore, setHasProducts}: {page: number, setHasMore: (data: boolean) => void, setHasProducts: (data: boolean) => void}) => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const LIMIT = 8;

    useEffect(() => {
            setLoading(true);
            fetch(`/api/products?page=${page}&limit=${LIMIT}`)
                .then(response => response.json())
                .then(page => {
                    setProducts([...products, ...page.content]);
                    setHasMore(!page.last);
                    setHasProducts(page.content.length > 0);
                })
                .catch((err) => {
                    console.log(err.message);
                })
                .finally(()=>{
                    setLoading(false);
                })
        }, [page]);

    if(products.length > 0){
        return (
            <div className="container">
                <div className="row my-5 d-flex justify-content-start">
                    {products.map((value, index) => (
                        <div className="col my-4 d-flex justify-content-around" key={index}>
                            <Product product={value}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="row my-5">
                <div className="col my-4 d-flex justify-content-around">
                {loading ?
                <>
                    <div className="spinner-border text-success" style={{width: "4rem", height:"4rem"}} role="status">
                        <span className="sr-only"></span>
                    </div>
                </>
                : <h3>There are no products available</h3>
                }
                </div>
            </div> 
        )
    }
}
export default ProductsLines;