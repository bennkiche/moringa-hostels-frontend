import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom"

const url = "http://127.0.0.1:5000"

function Signup() {
    const [user, setUser] = useState(null)
    const [accommodations, setAccommodations] = useState([]) 
    const [users, setUsers] = useState([])
    const [token, setToken] = useState(localStorage.getItem('access_token'))

    useEffect(() => {
        if (token) {
            fetchAccommodations()
            if (user?.role === "admin") {
                fetchUsers()
            }
        }
    }, [token, user])

    
    const fetchAccommodations = () => {
        fetch(`${url}/accommodations`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Failed to fetch accommodations')
            })
            .then((data) => {
                setAccommodations(data)
            })
            .catch((error) => {
                console.error('Error fetching accommodations:', error)
            })
    }

    const fetchUsers = () => {
        if (user?.role !== 'admin') {
            window.location.href = "/accommodations"
            return
        }

        fetch(`${url}/users`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.error('Error fetching users:', response.statusText)
                    throw new Error('Error fetching users')
                }
            })
            .then((data) => {
                console.log("Fetched users:", data); 
                setUsers(data)
            })
            .catch((error) => {
                console.error('Error fetching users:', error)
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        fetch(`${url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),  // Use 'name' as expected by the backend
                email: formData.get('email'),
                password: formData.get('password')
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("Invalid credentials")
                    throw new Error('Invalid credentials')
                }
            })
            .then((data) => {
                setToken(data.create_token)
                setUser({ name: data.user.name, role: data.role })
                localStorage.setItem("access_token", data.create_token)

                if (data.role) {
                    alert(`Welcome ${data.user.name}, your account has been logged in as a ${data.role}.`);
                } else {
                    alert(`Welcome ${data.user.name}, your account has been logged in.`);
                }
            })
            .catch((error) => {
                console.error("Login error:", error)
            })
    }

    const handleSignup = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

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
                    return response.json()
                } else {
                    alert("Error signing up")
                    throw new Error('Error signing up')
                }
            })
            .then((data) => {
                setToken(data.create_token) 
                setUser({ name: data.user.name, role: data.role }) 
                localStorage.setItem("access_token", data.create_token)

                if (data.role) {
                    alert(`Welcome ${data.user.name}, your account has been created as a ${data.role}.`);
                } else {
                    alert(`Welcome ${data.user.name}, your account has been created.`);
                }
            })
            .catch((error) => {
                console.error("Signup error:", error)
            })
    }

    const handleLogout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem("access_token")
    }

    return (
        <Router>
            <nav>
                <Link to="/accommodations">Accommodations</Link>
                {user?.role === 'admin' && <Link to="/users">Users</Link>}
                {user ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </nav>
            <Routes>
                <Route path="/accommodations" element={token ? <Accommodations accommodations={accommodations} /> : <Navigate to="/login" />} />
                <Route path="/users" element={user?.role === 'admin' ? <Users users={users} /> : <Navigate to="/accommodations" />} />
                <Route path="/login" element={user ? <Navigate to="/accommodations" /> : <LoginForm handleLogin={handleLogin} />} />
                <Route path="/signup" element={user ? <Navigate to="/accommodations" /> : <SignupForm handleSignup={handleSignup} />} />
            </Routes>
        </Router>
    )
}

// Component for displaying accommodations
function Accommodations({ accommodations }) {
    return (
        <div>
            <h2>Accommodations</h2>
            <ul>
                {accommodations.map((accommodation) => (
                    <li key={accommodation.id}>
                        <h3>{accommodation.name}</h3>
                        <p><strong>Price:</strong> {accommodation.price} USD</p>
                        <p><strong>Description:</strong> {accommodation.description}</p>
                        <p><strong>Availability:</strong> {accommodation.availability ? "Available" : "Not Available"}</p>
                        <img src={accommodation.image} alt={accommodation.name} style={{ width: '200px', height: 'auto' }} />
                    </li>
                ))}
            </ul>
        </div>
    )
}


function Users({ users }) {
    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email} - {user.role} {/* Update to 'name' */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function LoginForm({ handleLogin }) {
    return (
        <form onSubmit={handleLogin}>
            <input type="text" name="name" placeholder="Enter name..." required /> {/* Change to 'name' */}
            <input type="email" name="email" placeholder="Enter email..." required />
            <input type="password" name="password" placeholder="Enter password..." required />
            <button type="submit">Login</button>
        </form>
    )
}

function SignupForm({ handleSignup }) {
    return (
        <form onSubmit={handleSignup}>
            <input type="text" name="name" placeholder="Enter name..." required /> {/* Change to 'name' */}
            <input type="email" name="email" placeholder="Enter email..." required />
            <input type="password" name="password" placeholder="Enter password..." required />
            <input type="text" name="role" placeholder="Enter role (optional)" />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default Signup
