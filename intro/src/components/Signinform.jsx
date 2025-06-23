import { LuLock, LuMail } from "react-icons/lu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signinform = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email && password) {
      navigate("/chatpage");
    } else {
      alert("Please fill in all fields.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-emerald-800 mb-1"
        >
          Email address
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LuMail className="h-5 w-5 text-emerald-400" />
          </div>
          <input
            type="email"
            id="email"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-emerald-200 rounded-lg bg-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="passwo"
          className="block text-sm font-medium text-emerald-800 mb-1"
        >
          Password
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LuLock className="h-5 w-5 text-emerald-400" />
          </div>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-emerald-200 rounded-lg bg-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="text-emerald-600 focus:ring-emerald-500 border-emerald-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-emerald-800"
          >
            Remember me
          </label>
        </div>

        <Link
          to="/forgot-password"
          className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-emerald-500 transition cursor-pointer"
      >
        Sign in
      </button>
    </form>
  );
};

export default Signinform;
