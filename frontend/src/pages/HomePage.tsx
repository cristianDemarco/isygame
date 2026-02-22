import { useState } from 'react';
import ProductsLines from '../components/ProductsLines';

function HomePage(){
    const [page, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const handleHasMore = (data: boolean)=>{
        setHasMore(data);
    };

    return (
        <>
            <ProductsLines page={page} setHasMore={handleHasMore}></ProductsLines>
            {
                hasMore && <div className="row d-flex justify-content-center">
                <div className="col text-center">
                    {hasMore && <button type="button" className="btn btn-light text-center mb-5" onClick={
                        () => {
                            setPageNum(page+1);
                        }
                    }>Load more</button>}
                </div>
            </div>
            }
        </>
        
    )
}

export default HomePage;