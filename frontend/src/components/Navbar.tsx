import { useNavigate } from "react-router-dom"; 
import { useAuth} from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { token, userInfo, logout } = useAuth();
    
    return (
        <nav className="navbar bg-body-tertiary sticky-top" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand mx-3 flex-fill" onClick={()=>{navigate("/home")}}>
                    <img src="src/assets/logo-isygame.png" alt="Logo" width="100" height="100" className="d-inline-block align-text-middle"></img>
                    <h3 className="d-inline-block">Isygame</h3>
                </a>
                {
                    token && (
                        <a className="navbar-brand fs-1 d-inline-flex align-items-center gap-2" onClick={()=>{navigate("/cart")}}>
                            <i className="bi bi-cart" />
                            <h3 className="m-0">Cart</h3>
                        </a>)
                }
                <button className="navbar-toggler mx-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        {token
                        ? <h4 className="offcanvas-title" id="offcanvasNavbarLabel">Welcome, {userInfo.nickname}</h4>
                        : <h4 className="offcanvas-title" id="offcanvasNavbarLabel" onClick={()=>{navigate("/login")}}>Welcome, login</h4>
                        }
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 px-3">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" onClick={()=>{navigate("/home")}}>Home</a>
                        </li>
                        {token
                        ? <>
                        {<li className="nav-item">
                            <a className="nav-link" onClick={()=>{navigate("/cart")}}>Cart</a>
                        </li>/*
                        <li className="nav-item">
                            <a className="nav-link" href="#">Profile</a>
                        </li>*/}
                        <li className="nav-item">
                            <a className="nav-link" onClick={logout}>Logout</a>
                        </li>
                        </>
                        :
                        <li className="nav-item">
                            <a className="nav-link" onClick={()=>{navigate("/signup")}}>Sign up</a>
                        </li>
                        }
                        </ul>
                        {/*
                        <form className="d-flex mt-3" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;