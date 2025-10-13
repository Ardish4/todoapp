import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login Page</h2>
      <form style={{ display: "inline-block", textAlign: "left" }}>
        <label>Email:</label><br />
        <input type="email" placeholder="Enter your email" /><br /><br />
        <label>Password:</label><br />
        <input type="password" placeholder="Enter your password" /><br /><br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;