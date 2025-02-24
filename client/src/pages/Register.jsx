import React, { useState } from 'react'
import "../App.scss"
import { Link, Navigate } from 'react-router-dom'
import Logo from '../assets/images/react.svg'
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
function Register() {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: "",
        dob: ""
    });
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: "",
        dob: ""
    });
    const navigate = useNavigate();
    const { storeTokenLs } = useAuth();
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
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
    const calculateAge = (dob) => {
        const newDob = new Date(dob);
        const toDay = new Date();

        let age = toDay.getFullYear() - newDob.getFullYear();
        const month = toDay.getMonth() - newDob.getMonth();
        console.log(newDob, toDay, age, month, toDay.getDate(), newDob.getDate());
        if (month < 0 || (month === 0 && toDay.getDate() < newDob.getDate())) {
            age--
        }
        console.log(age);
        return age;
    }
    const validationForm = () => {
        let valid = true;
        const newErrors = {};
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const namePattern = /^[A-Za-z]+([ A-Za-z'-]*[A-Za-z]+)*$/;
        //firstname
        if (!user.firstname) {
            newErrors.firstname = "Firstname is required."
            valid = false;
        } else if (!namePattern.test(user.firstname)) {
            newErrors.firstname = "Please enter a valid firstname."
            valid = false;
        }
        //lastname
        if (!user.lastname) {
            newErrors.lastname = "Lastname is required."
            valid = false;
        } else if (!namePattern.test(user.lastname)) {
            newErrors.lastname = "Please enter a valid lastname."
            valid = false;
        }
        //email
        if (!user.email) {
            newErrors.email = "Email address is required."
            valid = false;
        } else if (!emailPattern.test(user.email)) {
            newErrors.email = "Please enter a valid email address."
            valid = false;
        }
        //password
        if (!user.password) {
            newErrors.password = "Password is required."
            valid = false;
        } else if (user.password.length < 6) {
            newErrors.password = "Password must be 6 length"
            valid = false;
        }
        //gender
        if (!user.gender) {
            newErrors.gender = "Gender is required."
            valid = false;
        }
        //dob
        if (!user.dob) {
            newErrors.dob = "Date of Birth is required."
            valid = false;
        } else {
            const age = calculateAge(user.dob)
            if (age < 18) {
                newErrors.dob = "Age must be older than 18."
                valid = false;
            }
        }
        console.log(newErrors);

        setErrors(newErrors)
        return valid;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, errors);
        if (validationForm()) {
            try {
                const respoonse = await fetch(`http://localhost:5001/api/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                });
                console.log(respoonse);

                if (respoonse.ok) {
                    const res_data = await respoonse.json();
                    console.log(res_data);
                    storeTokenLs(res_data.token);
                    navigate("/home");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <section className="register">
            <div className="container">
                <img src={Logo} alt="" />
                <form onSubmit={handleSubmit}>
                    <div className="first-part">
                        <h3 className='heading'>Create a new account</h3>
                        <p className='sub-heading'>It's quick and easy.</p>
                    </div>
                    <div className="second-part">
                        <div className="name">
                            <div className="first-name">
                                <input
                                    type="text"
                                    name='firstname'
                                    id='firstname'
                                    placeholder='firstname'
                                    className="form-control"
                                    value={user.firstname}
                                    onChange={handleInput}
                                />
                                {errors.firstname && <p className='errors'>{errors.firstname}</p>}
                            </div>
                            <div className="last-name">
                                <input
                                    type="text"
                                    name='lastname'
                                    id='lastname'
                                    placeholder='lastname'
                                    className="form-control"
                                    value={user.lastname}
                                    onChange={handleInput}
                                />
                                {errors.lastname && <p className='errors'>{errors.lastname}</p>}
                            </div>
                        </div>
                        <div className="email">
                            <input
                                type="email"
                                name='email'
                                id='email'
                                placeholder='enter your email'
                                className="form-control"
                                value={user.email}
                                onChange={handleInput}
                            />
                            {errors.email && <p className='errors'>{errors.email}</p>}
                        </div>
                        <div className="password">
                            <input
                                type="password"
                                name='password'
                                id='password'
                                placeholder='enter your password'
                                className="form-control"
                                value={user.password}
                                onChange={handleInput}
                            />
                            {errors.password && <p className='errors'>{errors.password}</p>}
                        </div>
                        <div className="gender">
                            <p>Gender<span className='question-mark'><HiMiniQuestionMarkCircle /></span></p>
                            <div className="radio-buttons">
                                <label className="female" htmlFor="female">Female
                                    <input
                                        type="radio"
                                        name='gender'
                                        id='female'
                                        value="female"
                                        onChange={handleInput}
                                    />
                                </label>
                                <label className="male" htmlFor="male">male
                                    <input
                                        type="radio"
                                        name='gender'
                                        id='male'
                                        value="male"
                                        onChange={handleInput}
                                    />
                                </label>
                                <label className="others" htmlFor="others">others
                                    <input
                                        type="radio"
                                        name='gender'
                                        id='others'
                                        value="others"
                                        onChange={handleInput}
                                    />
                                </label>
                            </div>
                            {errors.gender && <p className='errors'>{errors.gender}</p>}
                        </div>
                        <div className="dob">
                            <label htmlFor="dob">Date Of Birth<span className='question-mark'><HiMiniQuestionMarkCircle /></span></label>
                            <input
                                type="date"
                                name='dob'
                                id='dob'
                                placeholder='please enter your date of birth'
                                className="form-control"
                                value={user.dob}
                                onChange={handleInput}
                            />
                            {errors.dob && <p className='errors'>{errors.dob}</p>}
                        </div>
                        <button className='btn btn-primary'>Sign Up</button>
                        <div className="forgot-pw">
                            <Link to="/">Already have an account?</Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register