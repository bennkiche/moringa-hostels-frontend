import { useNavigate } from 'react-router-dom';  // Import useNavigate

function LoginReset({ handleLogin }) {
    const navigate = useNavigate();  // Initialize the navigate function

    const handleForgotPassword = () => {
        navigate("/reset-password");  // Navigate to the password reset page
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="text" name="name" placeholder="Enter name..." required />
            <input type="email" name="email" placeholder="Enter email..." required />
            <input type="password" name="password" placeholder="Enter password..." required />
            <button type="submit">Login</button>
            <div>
                <button type="button" onClick={handleForgotPassword}>
                    Forgot Password?
                </button>
            </div>
        </form>
    );
}

export default LoginReset;
