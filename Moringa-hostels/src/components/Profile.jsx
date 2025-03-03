import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({ name: "", email: "", id: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setNewName(loggedInUser.name);
      setNewEmail(loggedInUser.email);
    }
  }, []);  

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!user.id) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    const token = localStorage.getItem("access_token");
    const requestBody = {
        name: newName,
        email: newEmail,
        current_password: currentPassword,
        new_password: newPassword || undefined, // Only send if changed
    };

    console.log("Sending PATCH request with:", requestBody);  // Debugging

    fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data); // Debugging
        if (data.error) {
          throw new Error(data.error);
        }
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify({ name: newName, email: newEmail, id: user.id }));
        navigate("/homeAuth");
    })
    .catch(error => {
        console.error("Update error:", error.message);
        alert(error.message || "Something went wrong. Please try again.");
    });
};

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>Name: </label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <label>Email: </label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />

        <label>Current Password: </label>
        <input
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label>New Password (optional): </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
