import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from 'react';
import { type UserDTO } from "../../DTOs/UserDTO";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const {login}=useAuth();
    const {storeUserInfo}=useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const fetchUserInfo = () => {
        const token = localStorage.getItem("token");
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`}
        }

        fetch("/api/users/me", requestOptions)
        .then(response => response.json())
        .then(data => {
            const user: UserDTO = {
                email: data.email,
                nickname: data.nickname
            }; 
            localStorage.setItem("email", user.email)
            storeUserInfo(user.nickname, user.email);
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email: formData.email, password: formData.password})
        };

        const response = await fetch("api/auth/login", requestOptions);
        const data = await response.json();

        login(data.token);    
        fetchUserInfo();        
        navigate("/home");
    }

    return (
        <>
            <div id="container" className="d-flex justify-content-center align-items-center">
                <div className="col-4">
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