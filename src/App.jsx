import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { register, login, logout } from "./auth";
import { auth } from "./firebase";
import { getUsers,updateUserRole,deleteUser } from "./firestore";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    try {
      const user = await register(email, password);
      alert("Register success: " + user.email);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      alert("Login success: " + user.email);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUsers([]);
      alert("Logout success");
    } catch (error) {
      alert(error.message);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Firebase Login Test</h1>

      {currentUser ? (
        <p>Login User: {currentUser.email}</p>
      ) : (
        <p>No user logged in</p>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      <button onClick={loadUsers}>Load Users</button>

      <h2>Users</h2>

      {users.map((user) => (
  <div key={user.id}>
    <p>{user.email}</p>

    <button
      onClick={() =>
        updateUserRole(user.id)
      }
    >
      Make Admin
    </button>
    <button
   onClick={async () => {
    await deleteUser(user.id);
    await loadUsers();
  }}
>
  Delete User
</button>
  </div>
))}
    </div>
  );
}

export default App;