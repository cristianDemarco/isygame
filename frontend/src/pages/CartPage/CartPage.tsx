import Products from '../../components/Products';

function CartPage(){
    const token = localStorage.getItem("token");
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`}
    }
    return (
        <>
            <Products url={"api/cart/products"} options={options} sectionTitle={"Your cart"}></Products>
        </>
        
    )
}

export default CartPage;