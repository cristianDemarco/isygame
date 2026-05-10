import { useNavigate } from "react-router-dom"; 
import { useAuth} from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");

    const {logout}=useAuth();
    
    return (
        <nav className="navbar bg-body-tertiary sticky-top" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand mx-3" onClick={()=>{navigate("/home")}}>
                    <img src="src/assets/logo-isygame.png" alt="Logo" width="100" height="100" className="d-inline-block align-text-middle"></img>
                    <h3 className="d-inline-block">Isygame</h3>
                </a>
                <button className="navbar-toggler mx-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    {token
                    ? <h4 className="offcanvas-title" id="offcanvasNavbarLabel">Welcome, {nickname}</h4>
                    : <h4 className="offcanvas-title" id="offcanvasNavbarLabel" onClick={()=>{navigate("/login")}}>Welcome, log in</h4>
                    }
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 px-3">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Cart</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Profile</a>
                    </li>
                    {token != null && <li className="nav-item">
                        <a className="nav-link" onClick={logout}>Logout</a>
                    </li>}
                    </ul>
                    <form className="d-flex mt-3" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;