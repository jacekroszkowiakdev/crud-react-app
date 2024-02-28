import "./Login.styles.css";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login: React.FC<{
    backendPort: number;
}> = ({ backendPort }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [registered, setRegistered] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate("/");
    };

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            const response = await fetch(
                `http://localhost:${backendPort}/api/user/login`,
                {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify({ username, password }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setLoggedIn(true);
            console.log("Logged in successfully!");
        } catch (error) {
            console.error("An error occurred during login:", error);
        }
    };

    const handleShowRegisterForm = () => {
        setShowRegisterForm(true);
    };

    const handleReturnToLoginForm = () => {
        setShowRegisterForm(false);
    };

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const email = formData.get("email") as string;

        try {
            const response = await fetch(
                `http://localhost:${backendPort}/api/user/register`,
                {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify({ username, password, email }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setRegistered(true);
            setShowRegisterForm(false);
            console.log("Registered successfully!");
        } catch (error) {
            console.error("An error occurred during registration:", error);
        }
    };

    return (
        <div className="login-container">
            <button className="go-to-main" onClick={handleNavigateHome}>
                X
            </button>
            <h3>{!showRegisterForm ? "Sign In" : "Register"}</h3>
            <form
                className={
                    !showRegisterForm ? "sing-in-form" : "create-user-from"
                }
                onSubmit={!showRegisterForm ? handleSignIn : handleRegister}
            >
                <div className="user-input">
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                    />
                </div>
                <div className="user-input">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                    />
                </div>
                {!showRegisterForm && (
                    <div className="buttons-section">
                        <button className="submit-button">Sign In</button>
                        <p>
                            Not registered yet?{" "}
                            <button onClick={handleShowRegisterForm}>
                                Register
                            </button>
                        </p>
                    </div>
                )}
                {showRegisterForm && (
                    <div>
                        <div className="user-input">
                            <input
                                type="email"
                                placeholder="E-mail"
                                name="email"
                                required
                            />
                        </div>
                        <button className="submit-button">Register</button>
                        <p>
                            Already registered?{" "}
                            <button onClick={handleReturnToLoginForm}>
                                Return to login
                            </button>
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};
