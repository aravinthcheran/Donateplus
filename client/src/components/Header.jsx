import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import '../styles/home.css'

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
    <header className='header bg-sky-100 shadow-md'>
      <div className='header2 max-w-full mx-auto'>
        <div className='header2 flex justify-between items-center max-w-6xl mx-auto p-3'>
          <Link to='/'>
            <h1 className='header3 font-bold text-sm sm:text-2xl ml-0'>
              <span className='web-app-name text-blue-800'>Donate</span>
              <span className='web-app-name text-slate-700'>+</span>
            </h1>
          </Link>
          <form
            onSubmit={handleSubmit}
            className='bg-slate-100 p-3 rounded-lg flex items-center'
          >
            <input
              type='text'
              placeholder='Search...'
              className='bg-transparent focus:outline-none w-24 sm:w-64'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className='text-slate-600' />
            </button>
          </form>
          <ul className='navv flex gap-4 navbar'>
            <Link to='/' className='home'>
              <li className='home '>
                Home
              </li>
            </Link>
            <Link to='/about' className='about'>
              <li className='about '>
                About
              </li>
            </Link>
            <Link to='/profile' className='about'>
              <li className='about '>
                profile
              </li>
            </Link>
            <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                />
              ) : (
                <li className='signin text-slate-700 hover:underline'>
                  Sign in
                </li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}
