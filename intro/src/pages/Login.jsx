import Signinform from "../components/Signinform";

const Login = () => {
  return (
    <>
      <div className="flex items-center">
        <div className="hidden md:flex p-3 h-screen bg-blue-900 w-1/2">
          <h1 className="text-5xl">Login</h1>
        </div>
        <Signinform />
      </div>
    </>
  );
};

export default Login;
