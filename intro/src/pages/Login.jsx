import { Link } from "react-router-dom"
import Signinform from "../components/Signinform";

const Login = () => {
  return (
    <>
      <div className="flex items-center">
        <div className="hidden lg:flex p-3 h-screen bg-blue-900 w-1/2">
          <h1 className="text-5xl">Login Page</h1>
        </div>
        <main className="min-h-screen bg-gray-100 flex items-center justify-center w-full px-5 lg:px-8 lg:w-1/2">
          <div className="w-full sm:max-w-md sm:mx-auto sm:w-full">
            <div className="bg-white py-8 px-5 rounded-lg shadow-lg lg:px-10">
              <Signinform />
              <div className="mt-4">
                <p className="">
                  Don't have an account? <Link to="" className="text-blue-500">Sign Up</Link>
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
