import { useEffect, useState } from "react";
import Product from "./product/Product";
import type { ProductDTO } from "../types/ProductDTO";
import type { PageDTO } from "../types/PageDTO";

const Products = ({url, options, sectionTitle}:{url:string, options?: RequestInit, sectionTitle:string}) => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<PageDTO<ProductDTO>>();
    const [pageNum, setPageNum] = useState(0);
    const LIMIT = 8;

    useEffect(() => {
            setLoading(true);
            fetch(`${url}?page=${pageNum}&limit=${LIMIT}`, options)
                .then(response => response.json())
                .then(page => {
                    setPage(page);
                    setProducts([...products, ...page.content]);
                })
                .catch((err) => {
                    console.log(err.message);
                })
                .finally(()=>{
                    setLoading(false);
                })
        }, [pageNum]);

    if(!page){
        return (<><div className="row my-5">
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
        </div></>)
    }

    return (
            <>
                {page.content.length>0 && <h1 className="row d-flex justify-content-center mt-5">{sectionTitle}</h1>}
                <div className="container">
                    <div className="row my-5 d-flex justify-content-start">
                        {products.map((value, index) => (
                            <div className="col my-4 d-flex justify-content-around" key={index}>
                                <Product product={value}/>
                            </div>
                        ))}
                    </div>
                </div>
                {!page.last && <div className="row d-flex justify-content-center">
                    <div className="col text-center">
                        {<button type="button" className="btn btn-light text-center mb-5" onClick={
                            () => {
                                setPageNum(pageNum+1);
                            }
                        }>Load more</button>}
                    </div>
                </div>}
            </>
        );
}
export default Products;