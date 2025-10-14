import React, { useState } from "react";
import { Link } from "react-router-dom";
function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 
                    bg-gray-900 
                    font-sans">


      <div className="bg-gray-800/70 backdrop-blur-md 
                      p-8 sm:p-10 rounded-2xl 
                      shadow-2xl 
                      max-w-md w-full 
                      border border-indigo-500/20 
                      transform hover:shadow-indigo-500/30 transition duration-300 ease-in-out">
        
        <h2 className="text-3xl font-extrabold mb-8 text-white text-center">
          Create Your Account HERE💦💦
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 
                         bg-gray-700 text-white 
                         border border-gray-600 rounded-xl 
                         placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                         transition duration-150 ease-in-out"
            />
          </div>



          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 
                         bg-gray-700 text-white 
                         border border-gray-600 rounded-xl 
                         placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                         transition duration-150 ease-in-out"
            />
          </div>



          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 
                         bg-gray-700 text-white 
                         border border-gray-600 rounded-xl 
                         placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                         transition duration-150 ease-in-out"
            />
          </div>



          <button
            type="submit"
            className="w-full mt-6 
                       bg-indigo-600 text-white 
                       py-3 rounded-xl 
                       font-semibold text-lg 
                       shadow-md shadow-indigo-500/50 
                       hover:bg-indigo-700 
                       focus:outline-none focus:ring-4 focus:ring-indigo-500/50 
                       transition duration-200 ease-in-out 
                       transform hover:scale-[1.01]"
          >
            Sign Up Now
          </button>
        </form>
      </div>



      <p className="mt-6 text-gray-400 text-sm">
        Already have an account?{" "}
       <Link 
          to="/login" 
          className="text-indigo-400 font-medium 
                     hover:text-indigo-300 hover:underline 
                     transition duration-150"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}


export default function App() {
    return <Signup />;
}