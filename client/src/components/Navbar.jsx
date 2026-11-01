import {useContext,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const {user,setUser} = useContext(AuthContext);
  const [loading,setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogout = async (e)=>{
    e.preventDefault();
    try{
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_API}/auth/logout`,{}, { withCredentials: true });
      await new Promise(resolve => setTimeout(resolve, 300));

      setUser(null);
      navigate('/');
    }catch(error){
      console.error("Error logging out:", error.response?.data?.message || error.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link to="/" className="flex items-center gap-2.5" aria-label="Linkly home">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-lime-400 text-slate-950">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.07 0l2-2A5 5 0 0 0 12 3.93l-1.15 1.15" />
              <path d="M14 11a5 5 0 0 0-7.07 0l-2 2A5 5 0 0 0 12 20.07l1.15-1.15" />
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-950">linkly</span>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          <a href="#features" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
            How it works
          </a>
          <a href="#about" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
            About
          </a>
        </div>

        {user ? (
          <div className="flex items-center gap-5">
            <span className="hidden text-sm font-medium text-slate-600 sm:block">
              Hi, {user.name}
            </span>
            <Link
              onClick={handleLogout}
              disabled={loading}
              className="flex w-[100px] items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 hover:text-red-700 active:scale-95"
            >
              {loading ? 
              (
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ):(
                  <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                  Logout
              </>
                )}
            </Link>
          </div>) :
          <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
          >
            Get started
          </Link>
        </div>
        }
        
      </nav>
    </header>
  )
}

export default Navbar
