import { useNavigate } from 'react-router-dom'

function LoginReset({ handleLogin }) {
    const navigate = useNavigate()  

    const handleForgotPassword = () => {
        navigate("/reset-password")
    }

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
    )
}

export default LoginReset
