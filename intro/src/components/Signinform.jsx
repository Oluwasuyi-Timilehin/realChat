import { LuLock, LuMail } from "react-icons/lu";
import { Link } from "react-router-dom";

const Signinform = () => {
  return (
    <>
      <form action="" className="space-y-6">
        <div className="">
          <label
            htmlFor="email"
            className="block font-medium text-sm text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1 relative rounded shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LuMail className="text-gray-400 h-5 w-5" />
            </div>
            <input
              type="text"
              className="mt-1 w-full py-2 pl-10 pr-5 border border-gray-300 rounded focus:outline-none"
            />
          </div>
        </div>
        <div className="">
          <label
            htmlFor="password"
            className="block font-medium text-sm text-gray-700"
          >
            Password
          </label>
          <div className="mt-1 relative rounded shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LuLock className="text-gray-400 h-5 w-5" />
            </div>
            <input
              type="text"
              className="mt-1 w-full py-2 pl-10 pr-5 border border-gray-300 rounded focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="cursor-pointer" />
            <label htmlFor="checkbox" className="text-sm text-gray-700">
              Remember Me
            </label>
          </div>
          <Link
            to="/forgotpassword"
            className="underline text-sm text-red-600 cursor-pointer"
          >
            Forgot password?
          </Link>
        </div>
        <button className="bg-emerald-600 w-full text-white rounded-md shadow-sm text-sm py-3 font-medium cursor-pointer">
          Log In
        </button>
      </form>
    </>
  );
};

export default Signinform;
