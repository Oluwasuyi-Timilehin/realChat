import { Link } from "react-router-dom";
import Signinform from "../components/Signinform";

const Login = () => {
  return (
    <>
      <div className="flex items-center bg-gray-100">
        <div className="hidden lg:flex p-3 h-screen w-1/2">
          <h1 className="text-5xl">Login Page</h1>
        </div>
        <main className="min-h-screen flex items-center justify-center w-full px-5 lg:px-8 lg:w-1/2">
          <div className="w-full sm:max-w-md sm:mx-auto sm:w-full">
            <h2 className="font-bold text-zinc-800 text-center text-2xl mb-7 lg:text-3xl">
              Log in to your account
            </h2>
            <div className="bg-white py-8 px-5 rounded-lg shadow-lg lg:px-10">
              <Signinform />
              <div className="mt-4 text-center text-sm">
                <p className="text-gray-700">
                  Don't have an account?{" "}
                  <Link to="" className="text-emerald-600 hover:text-emerald-500">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
