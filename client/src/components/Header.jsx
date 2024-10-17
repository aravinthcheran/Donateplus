import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import '../styles/home.css';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-white shadow-lg'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link to='/' className='text-3xl font-bold text-indigo-700 tracking-wide'>
          <span className='text-purple-600'>Donate</span>
          <span className='text-indigo-800'>+</span>
        </Link>
        
        <form onSubmit={handleSubmit} className='relative flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-gray-100 px-4 py-2 rounded-full shadow-sm focus:outline-none w-32 sm:w-64 focus:ring-2 focus:ring-indigo-300 transition-all duration-200'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' className='absolute right-2'>
            <FaSearch className='text-indigo-600' />
          </button>
        </form>

        <nav className='flex items-center gap-6'>
          <Link to='/' className='text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors'>
            Home
          </Link>
          <Link to='/about' className='text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors'>
            About
          </Link>
          <Link to='/sign-in' className='text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors'>
            Sign In
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-8 w-8 object-cover shadow-md hover:scale-105 transition-transform'
                src={currentUser.avatar}
                alt='Profile'
              />
            ) : (
              <span className='text-lg font-medium text-indigo-600 hover:underline'>
                Sign in
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
