import React, { useState } from 'react'
import Logo from "../assets/images/react.svg"
import { Link, useNavigate } from 'react-router-dom'
import "../App.scss"
import { useAuth } from '../store/auth';
function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();
    const { storeTokenLs } = useAuth();
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]: value
        })

        if (value.trim() !== "") {
            setErrors({
                ...errors,
                [name]: ""
            })
        }
    }
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!user.email) {
            newErrors.email = "Email is required."
            valid = false;
        } else if (!emailPattern.test(user.email)) {
            newErrors.email = "Please enter a valid email address"
            valid = false;
        }

        if (!user.password) {
            newErrors.password = "Password is required."
            valid = false;
        } else if (user.password.length < 6) {
            newErrors.password = "Password must be 6 length"
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        if (validateForm()) {
            try {
                const response = await fetch(`http://localhost:5001/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                if (response.ok) {
                    const res_data = await response.json();
                    console.log(res_data);
                    storeTokenLs(res_data.token);
                    navigate("/home");
                } else {
                    const message = await response.json();
                    console.log(message);
                    setMsg(message.msg)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <section className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 left">
                        <img src={Logo} alt="" />
                        <h3>Facebook helps you connect and share with the people in your life.</h3>
                    </div>
                    <div className="col-md-6 right">
                        <form onSubmit={handleSubmit}>
                            <div className="email">
                                <input
                                    type="email"
                                    id='email'
                                    name='email'
                                    placeholder='enter your email'
                                    className="form-control"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className='errors'>{errors.email}</p>}
                            </div>
                            <div className="password">
                                <input
                                    type="password"
                                    id='password'
                                    name='password'
                                    placeholder='enter your password'
                                    className="form-control"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className='errors'>{errors.password}</p>}
                                {msg && <p className='errors'>{msg}</p>}
                            </div>
                            <button className='btn btn-primary'>Login</button>
                            <div className="forgot-pw">
                                <Link to="#">Forgotten Password</Link>
                            </div>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login