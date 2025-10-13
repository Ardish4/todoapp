import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Signup Page</h2>
      <form style={{ display: "inline-block", textAlign: "left" }}>
        <label>Full Name:</label><br />
        <input type="text" placeholder="Enter your name" /><br /><br />
        <label>Email:</label><br />
        <input type="email" placeholder="Enter your email" /><br /><br />
        <label>Password:</label><br />
        <input type="password" placeholder="Create a password" /><br /><br />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;