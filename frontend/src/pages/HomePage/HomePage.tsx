import Products from '../../components/Products';

function HomePage(){
    return (
        <>
            <Products url={"api/products"}></Products>
        </>
        
    )
}

export default HomePage;