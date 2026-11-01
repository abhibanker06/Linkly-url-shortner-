import {useState,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthContext from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const {setUser} = useContext(AuthContext);
  const [formdata,setFormdata] = useState({
    email : "",
    password: ""
  });

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{

      const response = await axios.post(`${import.meta.env.VITE_API}/auth/login`,formdata,{withCredentials:true});

      setUser(response.data.user);

      setFormdata({
        email : "",
        password: ""
      })

      navigate("/");
    }
    catch(error){
      console.error("Error logging in:", error.response?.data?.message || error.message);
    }finally{
      setLoading(false);
    }

  }

  const handleChange =(e)=>{
    setFormdata({...formdata, [e.target.name]:e.target.value});
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative flex min-h-[440px] flex-col overflow-hidden bg-slate-950 px-6 py-7 text-white sm:px-10 lg:min-h-screen lg:px-14 lg:py-10">
          <div className="pointer-events-none absolute -right-32 top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-20 top-36 h-56 w-56 rounded-full border border-lime-300/20" />

          <Link to="/" className="relative flex w-fit items-center gap-2.5" aria-label="Linkly home">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-lime-400 text-slate-950">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.07 0l2-2A5 5 0 0 0 12 3.93l-1.15 1.15" />
                <path d="M14 11a5 5 0 0 0-7.07 0l-2 2A5 5 0 0 0 12 20.07l1.15-1.15" />
              </svg>
            </span>
            <span className="text-xl font-bold tracking-tight">linkly</span>
          </Link>

          <div className="relative my-auto max-w-xl py-16 lg:py-20">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
              Your links, all in one place
            </p>
            <h1 className="max-w-lg text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Welcome back.
              <br />
              <span className="text-lime-300">Pick up where you left off.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
              Sign in to manage your short links and keep sharing with clarity.
            </p>

            <div className="mt-11 max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">A cleaner way to share</p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm sm:flex-nowrap">
                <span className="min-w-0 truncate text-slate-400">example.com/a-very-long-url</span>
                <span className="text-lime-300">→</span>
                <span className="shrink-0 rounded bg-lime-300/10 px-2.5 py-1.5 font-semibold text-lime-300">linkly.to/start</span>
              </div>
            </div>
          </div>

          <p className="relative text-xs text-slate-500">Simple links for wherever life takes you.</p>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-9">
              <p className="mb-3 text-sm font-semibold text-lime-700">Good to see you again</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Log in to Linkly</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Enter your account details to continue.</p>
            </div>

            <form className="space-y-5" onSubmit= {handleSubmit}>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formdata.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-800">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formdata.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  placeholder="Your password"
                  className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center cursor-pointer justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <svg
                    className="h-4 w-4 animate-spin"
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
                ): "Log in"}

              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              New to Linkly?{' '}
              <Link to="/signup" className="font-semibold text-slate-950 underline decoration-lime-500 decoration-2 underline-offset-4 hover:text-lime-800">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login
