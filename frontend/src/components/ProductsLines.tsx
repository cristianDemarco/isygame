import Product from "./Product";
const ProductsLines = () => {

    const products = Array.from({ length: 12 });

    return (
        <div className="container">
            <div className="row my-5 d-flex justify-content-start">
                {products.map((_, index) => (
                    <div className="col-4 my-4 d-flex justify-content-around" key={index}>
                        <Product />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProductsLines;