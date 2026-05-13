import Products from '../../components/Products';

function HomePage(){
    return (
        <>
            <Products url={"api/products"} sectionTitle={"Browse Our Collection"}></Products>
        </>
        
    )
}

export default HomePage;