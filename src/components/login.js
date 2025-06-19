import { useState, useContext } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import "./LoginPage.css";
import { Bloglist } from "../store/store";
import { API_BASE_URL } from "../api";

const Login=({updateVal})=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useContext(Bloglist);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        updateVal("home");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Login error");
    }
  };
  return(
    <>

<div className="login-container">
  <p className="p" onClick={()=>updateVal("home")}><IoIosArrowRoundBack />
</p>
      <div className="login-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit">Login</button>
        </form>

        <p className="signup-link">
          Don't have an account? <a onClick={()=>{updateVal("signin")}} className="sign">Sign up</a>
        </p>
      </div>
    </div>
 

    </>
  )
}

export default Login