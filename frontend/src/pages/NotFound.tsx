import { useNavigate } from "react-router-dom"; 

function CartPage(){
    const navigate = useNavigate();

    return (
        <>
            <div className="container fluid">
                <div className="row my-5 d-flex justify-content-center">
                    <h1 className="row d-flex mt-5 game-title fw-bolder justify-content-center display-2">GAME OVER</h1>
                    <h1 className="row d-flex mt-2 fw-boder justify-content-center">Error 404: this page is not avaible</h1>
                    <img src="src/assets/images/glitched-logo.png" className="card-img-top w-25"/>
                    <div className="row d-flex justify-content-center gap-5">
                        <button type="button" className="btn btn-success mb-5 btn-md w-25" style={{fontSize: "clamp(1rem, 2.5vw, 1.8rem)"}}  onClick={()=>{navigate("/home")}}>Homepage</button>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default CartPage;