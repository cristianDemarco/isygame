import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from 'react';
import { type UserDTO } from "../../types/UserDTO";
import { sendRequest } from "../../hooks/useApi";


const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const {token}=useAuth();
    const {login, storeUserInfo}=useAuth();
    const [error, setError]=useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const fetchUserInfo = (token: string) => {
        console.log("token fetch user info: " + token)
        sendRequest("GET", "users/me", undefined, token)
        .then(response => response.json())
        .then(data => {
            const user: UserDTO = {
                email: data.email,
                nickname: data.nickname
            }; 
            storeUserInfo(user.nickname, user.email);
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await sendRequest(
            "POST",
            "auth/login",
            {email: formData.email, password: formData.password},
            undefined
        )

        const data = await response.json();

        if(response.ok){
            login(data.token);    
            fetchUserInfo(data.token);        
            navigate("/home");
        }
        else {
            setError(data.message);
        }
    }

    return (
        <>
            <div id="container" className="d-flex justify-content-center align-items-center">
                <div className="col-lg-4 col-md-6 col-sm-8">
                    <form className="mx-5" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                            <input name="email" type="email" className="form-control" id="inputEmail" minLength={3} maxLength={50} aria-describedby="emailHelp" required value={formData.email} onChange={handleChange}></input>
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input name="password" type="password" className="form-control" id="inputPassword" minLength={8} maxLength={50} required value={formData.password} onChange={handleChange}></input>
                        </div>
                        <p className="text-danger">{error}</p>
                        <div className="w-100 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary px-5">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage;