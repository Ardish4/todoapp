import React from 'react';
import { Link } from "react-router-dom";

function Hero() {
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center text-indigo-400 font-bold text-2xl tracking-wider">
          {/* Replaced CheckCircle with an inline SVG */}
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
         TODO App
        </div>
        <nav className="space-x-4">
          <a>
             <Link 
            to="/login" 
            className="text-gray-300 hover:text-indigo-400 transition-colors font-medium cursor-pointer"
          >
            Log-in
          </Link>
  
          </a>
          <a>
           
            <Link 
            to="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 font-medium cursor-pointer"> Get Started
            </Link>
          
           
          </a>
        </nav>
      </header>

      <main className="text-center mt-20 max-w-4xl">
        <p className="flex items-center justify-center text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">
          {/* Replaced Sparkles with a Unicode emoji */}
          <span className="mr-1 text-yellow-400">✨</span>
          Simplify Your Day
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          <span className="block">Manage Tasks.</span>
          <span className="block text-indigo-400">Conquer Productivity.</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          The easiest way to track your daily goals, organize your life, and make sure nothing slips through the cracks.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a className="w-full sm:w-auto px-10 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"> Start for Free
      
          </a>
          <br/>
          <a>
            <div className="w-full sm:w-auto px-10 py-4 text-lg font-semibold rounded-xl text-indigo-400 border-2 border-indigo-700 bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"> Learn More</div>
          
           
          </a>
        </div>
      </main>

      <footer className="mt-20 w-full max-w-4xl p-4">
        <div className="h-64 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg border-4 border-indigo-700 border-dashed">
          <p className="text-indigo-400 font-semibold text-xl">
            [Pore korbo]
          </p>
        </div>
        <br/>

           <div className="h-64 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg border-4 border-indigo-700 border-dashed">
          <p className="text-indigo-400 font-semibold text-xl">
            [Pore korbo]
          </p>
        </div>
        <br/>


         <div className="h-64 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg border-4 border-indigo-700 border-dashed">
          <p className="text-indigo-400 font-semibold text-xl">
            [Pore korbo]
          </p>
        </div>
        <br/>

         <div className="h-64 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg border-4 border-indigo-700 border-dashed">
          <p className="text-indigo-400 font-semibold text-xl">
            [Pore korbo ]
          </p>
        </div>
        <br/>


        <div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          <span className="block">blank.</span>
          <span className="block text-indigo-400">blank</span>
        </h1>
        </div>
        
      </footer>

<p>
  <Link 
            to="/login" 
            className="text-indigo-400 font-medium 
                       hover:text-indigo-300 hover:underline 
                       transition duration-150"
          >
            Login
          </Link>
</p>
    </div>
  );
}

export default Hero;
