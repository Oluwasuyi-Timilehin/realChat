import { Link } from "react-router-dom";
import Signinform from "../components/Signinform";
import img2 from "/Images/img2.png";

const Login = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Image Section */}
      <div className="hidden lg:flex items-center py justify-center bg-[#076462] lg:w-1/2">
        <img
          src={img2}
          alt="Robot chatbot illustration"
          className="max-w-md h-auto w-[400px]"
        />
      </div>

      {/* Form Section */}
      <main className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-900">
              Welcome back
            </h2>
            <p className="mt-2 text-emerald-600">
              Log in to your account to continue
            </p>
          </div>

          <div className="bg-emerald-50 rounded-2xl shadow-lg border border-emerald-100 p-8">
            <Signinform />

            <div className="mt-6 text-center text-sm">
              <p className="text-emerald-700">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
