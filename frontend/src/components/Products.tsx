import { useEffect, useState } from "react";
import Product from "./product/Product";
import type { ProductDTO } from "../types/ProductDTO";
import type { PageDTO } from "../types/PageDTO";
import Alert from "./Alert";
import { useAuth } from "../context/AuthContext";

const Products = ({ url, options }: { url: string, options?: RequestInit }) => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<PageDTO<ProductDTO>>();
    const [pageNum, setPageNum] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const { token, initCartIds } = useAuth();
    const LIMIT = 8;

    useEffect(() => {
        setLoading(true);
        fetch(`${url}?page=${pageNum}&limit=${LIMIT}`, options)
            .then(response => response.json())
            .then(page => {
                setPage(page);
                if (pageNum === 0) setProducts(page.content);
                else setProducts(prev => [...prev, ...page.content]);
            })
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false));
    }, [pageNum]);

    useEffect(() => {
        if (!token) return;
        fetch("api/cart/products", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => response.ok ? response.json() : [])
        .then((data: ProductDTO[]) => {
            initCartIds(data.map(p => p.id));
        })
        .catch(err => console.log(err.message));
    }, []);

    if (!page) {
        return (
            <div className="row my-5">
                <div className="col my-4 d-flex justify-content-around">
                    {loading
                        ? <div className="spinner-border text-success" style={{ width: "4rem", height: "4rem" }} role="status" />
                        : <h3>There are no products available</h3>
                    }
                </div>
            </div>
        );
    }

    return (
        <>
            {showAlert && <Alert message="Log in before adding products to the cart" color="red" />}
            {page.content.length > 0 && <>
            <h1 className="row d-flex justify-content-center mt-5">Browse Our Collection</h1>
            <h3 className="row d-flex justify-content-center mt-3">Ordered by name</h3>
            </>}
            
            <div className="container">
                <div className="row my-5 d-flex justify-content-start">
                    {products.map(product => (
                        <div className="col my-4 d-flex justify-content-around" key={product.id}>
                            <Product product={product} showAlert={() => setShowAlert(true)} />
                        </div>
                    ))}
                </div>
            </div>
            {!page.last && (
                <div className="row d-flex justify-content-center">
                    <div className="col text-center">
                        <button type="button" className="btn btn-light text-center mb-5" onClick={() => setPageNum(pageNum + 1)}>
                            Load more
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Products;