import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginForm.module.css';
import loginImage from './loginimage.jpg';

const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Redirect to home if already logged in
        }
    }, [navigate]);

    const validateEmail = (email) => {
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        return pattern.test(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let valid = true;

        // Reset errors
        setEmailError("");
        setPasswordError("");
        setServerError("");

        if (!email) {
            setEmailError("Email can't be blank");
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError("Enter a valid email address");
            valid = false;
        }

        if (!password) {
            setPasswordError("Password can't be blank");
            valid = false;
        }

        if (valid) {
            try {
                // API call for signup
                const response = await axios.post('/api/users/signup', { name: username, email, password });
                const { token, user } = response.data;

                // Store token in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('username', user.name);

                // Navigate to home or dashboard
                alert(`Welcome, ${user.name}!`);
                navigate('/');

            } catch (error) {
                if (error.response) {
                    setServerError(error.response.data.message || 'An error occurred during signup.');
                } else {
                    setServerError('Error connecting to the server.');
                }
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <img src={loginImage} alt="Signup" className={styles.loginImage} />
                <div className={styles.wrapper}>
                    <header>Sign Up</header>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="username">Username</label>
                            <div className={styles.inputArea}>
                                <input 
                                    id="username"
                                    type="text" 
                                    placeholder="Enter your username" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className={`${styles.field} ${emailError ? styles.error : ""}`}>
                            <label htmlFor="email">Email Address</label>
                            <div className={styles.inputArea}>
                                <input 
                                    id="email"
                                    type="text" 
                                    placeholder="Enter your email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            {emailError && <div className={styles.errorTxt}>{emailError}</div>}
                        </div>
                        <div className={`${styles.field} ${passwordError ? styles.error : ""}`}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.inputArea}>
                                <input 
                                    id="password"
                                    type="password" 
                                    placeholder="Enter your password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                            {passwordError && <div className={styles.errorTxt}>{passwordError}</div>}
                        </div>
                        {serverError && <div className={styles.serverError}>{serverError}</div>}
                        <button type="submit">Sign Up</button>
                    </form>
                    <div className={styles.signTxt}>
                        Already a member? <a href="/login">Login now</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
