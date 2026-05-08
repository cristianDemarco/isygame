import "../../utils/validations";
import { validatePasswordMatch } from "../../utils/validations";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(validatePasswordMatch(password, confirmPassword)) return;

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({nickname:username, email: email, password: password})
        };

        fetch(`/api/auth/signup`, requestOptions)
            .then(response => {
                console.log(response.json)
                navigate("/login");
            })
            
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <>
            <div id="container" className="d-flex justify-content-center align-items-center">
                <div className="col-4">
                    <form className="mx-5" onSubmit={handleSubmit}>
                        <h2>Signup</h2>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="Username" minLength={3} maxLength={30} required onChange={(e) => setUsername(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" minLength={3} maxLength={50} aria-describedby="emailHelp" required onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword" minLength={8} maxLength={50} required onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                            <input type="password" className="form-control" id="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        </div>
                        <p className="text-danger">{validatePasswordMatch(password, confirmPassword)}</p>
                        <div className="w-100 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary px-5">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignupPage;