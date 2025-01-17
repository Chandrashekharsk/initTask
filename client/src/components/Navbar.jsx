import { useState, useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import api from '../config/axios';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await api.get('/users/logout', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true 
      });
      navigate('/login');
      
    } catch (error) {
      console.log("something went wrong ");
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [user]);

  return (
    <nav className="container mx-auto w-full flex items-center py-4 px-2 bg-white shadow-md relative">
      <ul className="flex justify-between items-center w-full">
        <li className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors cursor-pointer">
          <Link to="/">Hello</Link>
        </li>

        <li className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none"
          >
            <User className="w-6 h-6 text-gray-800 hover:text-gray-600 transition-colors cursor-pointer" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-10">
              {user ? (
                <>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
