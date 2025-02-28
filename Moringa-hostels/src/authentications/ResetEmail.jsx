import { useState } from 'react';

const url = "http://127.0.0.1:5000";

function PasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        fetch(`${url}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to send reset link');
                }
            })
            .then((data) => {
                setMessage("If the email exists in our system, you will receive a password reset link shortly.");
                setError('');
            })
            .catch((error) => {
                setError("An error occurred while sending the password reset link.");
                setMessage('');
            });
    };

    return (
        <div>
            <h2>Reset Your Password</h2>
            <form onSubmit={handleResetPassword}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PasswordReset;
