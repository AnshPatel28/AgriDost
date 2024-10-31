import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginForm.module.css';
import loginImage from './loginimage.jpg'; // Update the correct image path

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState(""); // New state for server errors
    const navigate = useNavigate();

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
                // API call for login
                const response = await axios.post('/api/login', { email, password });
                const { token, user } = response.data;

                // Store token and username in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('username', user.name);

                // Navigate to the home/dashboard after login
                alert(`Welcome, ${user.name}!`);
                navigate('/');

            } catch (error) {
                if (error.response) {
                    setServerError(error.response.data.message || "Invalid login credentials");
                } else {
                    setServerError("Error connecting to the server");
                }
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <img src={loginImage} alt="Login" />
                <div className={styles.wrapper}>
                    <header>Login</header>
                    <form onSubmit={handleSubmit}>
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
                        <div className={styles.passTxt}>
                            <Link to="#">Forgot password?</Link>
                        </div>
                        {serverError && <div className={styles.serverError}>{serverError}</div>}
                        <button type="submit">Login</button>
                    </form>
                    <div className={styles.signTxt}>
                        Not yet a member? <Link to="/signup">Signup now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
