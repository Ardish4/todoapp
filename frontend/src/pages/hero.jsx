import React from 'react';

const photoGallery = [
  {
    title: 'Streamlined Task Management',
    description: 'Effortlessly organize your daily tasks and never miss a deadline again.',
    url: '/gallery-images/todo1.png',
  },
  {
    title: 'Intuitive Workflow!!',
    description: 'A user-friendly interface designed to make managing your to-dos simple and efficient.',
    url: '/gallery-images/todo22.png',
  },
  {
    title: 'Achieve Your Goals',
    description: 'Break down big projects into manageable steps and track your progress with ease.',
    url: '/gallery-images/todo3.png',
  },
  {
    title: 'Stay Organized, Anywhere',
    description: "Access your to-do list from any device, ensuring you're always on top of your schedule",
    url: '/gallery-images/todo4.jpg',
  },
];


function App() {
  return (
    <div className='min-h-screen bg-gray-900 flex flex-col items-center p-4 font-inter'>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

   
      <header className='fixed top-0 left-0 right-0 p-4 flex justify-center z-10 bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-indigo-900'>
        <div className='flex justify-between items-center max-w-7xl w-full'>
          <div className='flex items-center text-indigo-400 font-bold text-2xl tracking-wider'>
            <svg
              className='w-6 h-6 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            TODO App
          </div>
          <nav className='space-x-4 flex items-center'>
            <a
              href='#features'
              className='text-gray-300 hover:text-indigo-400 transition-colors font-medium cursor-pointer'
            >
              Features
            </a>
            <a
              href='#contact'
              className='text-gray-300 hover:text-indigo-400 transition-colors font-medium cursor-pointer'
            >
              Contact
            </a>
            <a
              href='/login'
              className='text-gray-300 hover:text-indigo-400 transition-colors font-medium cursor-pointer hidden sm:inline-block'
            >
              Log In
            </a>
            <a
              href='signup'
              className='px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 font-medium cursor-pointer'
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className='text-center mt-32 max-w-4xl'>
        <p className='flex items-center justify-center text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3'>
          <span className='mr-1 text-yellow-400'>✨</span>
          Simplify Your Day
        </p>

        <h1 className='text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6'>
          <span className='block'>Manage Tasks.</span>
          <span className='block text-indigo-400'>Conquer Productivity.</span>
        </h1>

        <p className='text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto'>
          The easiest way to track your daily goals, organize your life, and
          make sure nothing slips through the cracks.
        </p>

        <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
          <a
            href='signup'
            className='w-full sm:w-auto px-10 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer'
          >
            Start for Free
          </a>
          <a
            href='#features'
            className='w-full sm:w-auto px-10 py-4 text-lg font-semibold rounded-xl text-indigo-400 border-2 border-indigo-700 bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer'
          >
            Learn More
          </a>
        </div>
      </main>

    
      <section
        id='features'
        className='mt-40 w-full max-w-7xl px-4'
      >
        <div className='text-center mb-16'>
          <h2 className='text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4'>
            <span className='block'>Powerful Features.</span>
            <span className='block text-indigo-400'>Simple Workflow.</span>
          </h2>
          <p className='text-xl text-gray-400 max-w-3xl mx-auto'>
            See how the TODO App helps you stay organized with a glance at its
            core features.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {photoGallery.map((photo, index) => (
            <div
              key={index}
              className='bg-gray-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-indigo-500/30 hover:-translate-y-1'
            >
              
              <div className='w-full aspect-video bg-indigo-900 flex items-center justify-center'>
                <img
                  src={photo.url}
                  alt={photo.title}
                  className='w-full h-full object-cover rounded-t-xl'
                
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.style.display = 'none'; 
                    const parent = e.target.parentNode;
                    parent.innerHTML = `
                      <div class="p-8 text-center text-gray-400">
                        <p class="font-bold text-lg text-indigo-300">${photo.title}</p>
                        <p class="text-sm">${photo.description}</p>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Text Description */}
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  {photo.title}
                </h3>
                <p className='text-gray-400 text-sm'>{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer
        id='contact'
        className='mt-40 w-full max-w-7xl p-4'
      >
      
        <div className='text-center mb-16'>
          <h2 className='text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4'>
            <span className='block'>For more information</span>
            <span className='block text-indigo-400'>Contact Us.</span>
          </h2>
        </div>

      
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
         
          <div className='bg-gray-800 p-10 rounded-2xl shadow-2xl border border-indigo-700/50'>
            <h3 className='text-4xl font-extrabold text-white mb-4 text-center'>
              Sayan Sarkar
            </h3>
            <p className='text-xl text-gray-400 mb-10 text-center'>
              Done the Front-end part.
            </p>

            <div className='flex justify-center space-x-8'>
              {/* Email Link */}
              <a
                href='mailto:sayns2069@email.com'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-indigo-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-indigo-300 transition-colors duration-300'>
                  Email
                </span>
              </a>

              {/* LinkedIn Link */}
              <a
                href='https://www.linkedin.com/in/sayansarkar2005/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-indigo-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM4 9h4v12H4zM6 6a2 2 0 100-4 2 2 0 000 4z'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-indigo-300 transition-colors duration-300'>
                  LinkedIn
                </span>
              </a>

              {/* GitHub Link */}
              <a
                href='https://github.com/SAYANui'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-indigo-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 19c-5 1.5-9-2-9-5 0-3.5 3.5-5 5-5.5.5-2.5 2-4 2-4 1.5-1.5 4-.5 6 0 1 1 2 2 2 4 0 2 1 4 2 4.5 1.5.5 5 2 5 5 0 3-4 6.5-9 5.5'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-indigo-300 transition-colors duration-300'>
                  GitHub
                </span>
              </a>
            </div>
          </div>

          {/* Ardish Bose Contact Card */}
          <div className='bg-gray-800 p-10 rounded-2xl shadow-2xl border border-indigo-700/50'>
            <h3 className='text-4xl font-extrabold text-white mb-4 text-center'>
              Ardish Bose
            </h3>
            <p className='text-xl text-gray-400 mb-10 text-center'>
              Done the Back-end part.
            </p>

            <div className='flex justify-center space-x-8'>
              {/* Email Link  */}
              <a
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-indigo-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-indigo-300 transition-colors duration-300'>
                  Email
                </span>
              </a>

              {/* LinkedIn Link*/}
              <a
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-indigo-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM4 9h4v12H4zM6 6a2 2 0 100-4 2 2 0 000 4z'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-indigo-300 transition-colors duration-300'>
                  LinkedIn
                </span>
              </a>

              {/* GitHub Link */}
              <a
                href='https://github.com/Ardish4'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-indigo-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 19c-5 1.5-9-2-9-5 0-3.5 3.5-5 5-5.5.5-2.5 2-4 2-4 1.5-1.5 4-.5 6 0 1 1 2 2 2 4 0 2 1 4 2 4.5 1.5.5 5 2 5 5 0 3-4 6.5-9 5.5'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-indigo-300 transition-colors duration-300'>
                  GitHub
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className='mt-20 text-center text-gray-600 border-t border-gray-800 pt-8'>
          <p className='text-sm'>
            &copy; {new Date().getFullYear()} TODO App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
