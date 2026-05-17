import { useNavigate } from "react-router-dom"; 

const Alert = ({message, color}: {message: String, color:String}) => {
    const navigate = useNavigate();

    return (
        <div className="row justify-content-center mt-3">
            <div className={`alert alert-${color=="green"?"success":"danger"} col-8`} role="alert">
            {message}. <a onClick={()=>navigate("/login")}><u>Log in</u></a>
        </div>
        </div>
    )
}

export default Alert; 