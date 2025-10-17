import { AiOutlineLogin } from 'react-icons/ai';

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      {/* Navbar */}
      <div className='flex p-4 justify-between items-center'>
        {/* Avatar */}
        <div className='w-8 h-8 bg-indigo-500 rounded-full'>
          <p className='text-white text-center text-xl select-none'>A</p>
        </div>
        {/* Logout */}
        <button className='hover:box-shadow hover:bg-gray-800 text-white font-semibold p-1 rounded-4xl flex items-center'>
          <AiOutlineLogin color='#625FFF' size={24} className='inline-block' />
        </button>
      </div>
      {/* Main Content */}
      <div className='p-4'>
        <input type="checkbox" width={200} height={200} className='accent-indigo-500 ' />
        <input type="text" className='border border-gray-700 bg-gray-800 p-2 rounded-md' placeholder='Add a new task...' />
      </div>
    </div>
  )
}

export default Home