import React, { useState } from 'react';
import NavbarUser from '../components/NavbarUser';

const url = "http://127.0.0.1:5000";

function SignupForm() {
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [user, setUser] = useState(null);

    const handleSignup = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        fetch(`${url}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                role: formData.get('role') || 'user' 
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((data) => {
                        alert(data.error || 'Error signing up');
                        throw new Error('Error signing up');
                    });
                }
            })
            .then((data) => {
                setToken(data.create_token);
                setUser({ name: data.user.name, role: data.role });
                localStorage.setItem("access_token", data.create_token);

                if (data.role) {
                    alert(`Welcome ${data.user.name}, your account has been created as a ${data.role}.`);
                } else {
                    alert(`Welcome ${data.user.name}, your account has been created.`);
                }
            })
            .catch((error) => {
                console.error("Signup error:", error);
            });
    };

    if (token) {
        return <Navigate to="/accommodationUsers" />;
    }

    return (
        <div className="signupContainer">
            <NavbarUser />
            <div className="signupCard">
                <div className="signupLeft">
                    <div className="signupImagePlaceholder">
                        <img src="https://cdn.create.vista.com/api/media/small/426382906/stock-photo-hostel-dormitory-beds-arranged-in-room" alt="signup" />
                    </div>
                </div>
                <div className="signupRight">
                    <h2>Create an Account</h2>
                    <form className="signupForm" onSubmit={handleSignup}>
                        <input className="signupInput" type="text" name="name" placeholder="Enter name..." required />
                        <input className="signupInput" type="email" name="email" placeholder="Enter email..." required />
                        <input className="signupInput" type="password" name="password" placeholder="Enter password..." required />
                        <button className="signupButton" type="submit">Sign Up</button>
                    </form>
                    <p className="signupFooter">Already have an account? <a href="/login">Log in</a></p>
                </div>
            </div>
        </div>
    );
    
}    

export default SignupForm;
