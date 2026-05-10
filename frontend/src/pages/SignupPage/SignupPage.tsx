import "../../utils/validations";
import { validatePasswordMatch } from "../../utils/validations";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        nickname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(validatePasswordMatch(formData.password, formData.confirmPassword)) return;

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({nickname:formData.nickname, email: formData.email, password: formData.password})
        };

        fetch(`/api/auth/signup`, requestOptions)
            .then(() => {
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
                            <input name="nickname" type="text" className="form-control" id="Username" minLength={3} maxLength={30} required value={formData.nickname} onChange={handleChange}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                            <input name="email" type="email" className="form-control" id="inputEmail" minLength={3} maxLength={50} aria-describedby="emailHelp" required value={formData.email} onChange={handleChange}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input name="password" type="password" className="form-control" id="inputPassword" minLength={8} maxLength={50} required value={formData.password} onChange={handleChange}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                            <input name="confirmPassword" type="password" className="form-control" id="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}></input>
                        </div>
                        <p className="text-danger">{validatePasswordMatch(formData.password, formData.confirmPassword)}</p>
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