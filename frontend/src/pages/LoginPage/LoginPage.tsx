import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login}=useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email: email, password: password})
        };

        fetch("api/auth/login", requestOptions)
        .then(response => response.json())
        .then(data =>{
            login(data);
            console.log("Logged in!");
            console.log(data);

            navigate("/");
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <div id="container" className="d-flex justify-content-center align-items-center">
                <div className="col-4">
                    <form className="mx-5" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" minLength={3} maxLength={50} aria-describedby="emailHelp" required onChange={(e) => setEmail(e.target.value)}></input>
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword" minLength={8} maxLength={50} required onChange={(e) => setPassword(e.target.value)}></input>
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