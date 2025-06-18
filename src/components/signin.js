import React, { useState, useContext } from "react";
import "./SignInPage.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Bloglist } from "../store/store";

export default function SignInPage({updateVal}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useContext(Bloglist);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        updateVal("home");
      } else {
        setError(data.message || "Sign up failed");
      }
    } catch (err) {
      setError("Sign up error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <p className="p" onClick={()=>updateVal("home")}><IoIosArrowRoundBack/></p>
      <div className="signin-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignIn}>
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Username</label>
          <input
            type="text"
            placeholder="yourusername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
        </form>

        <p className="login-link">
          Already have an account? <a onClick={()=>{updateVal("login")}} className="log">Login</a>
        </p>
      </div>
    </div>
  );
}
