import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { register, login, logout } from "./auth";
import { auth } from "./firebase";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    await logout();
    alert("Logout success");
  };

  return (
    <div>
      <h1>Firebase Login Test</h1>

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
    </div>
  );
}

export default App;