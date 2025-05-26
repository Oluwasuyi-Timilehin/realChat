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
          <input
            type="text"
            className="mt-1 w-full py-2 px-3 border border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div className="">
          <label
            htmlFor="password"
            className="block font-medium text-sm text-gray-700"
          >
            Password
          </label>
          <input
            type="text"
            className="mt-1 w-full py-2 px-3 border border-gray-300 rounded focus:outline-none"
          />
        </div>
        <button className="bg-emerald-600 w-full text-white rounded py-2 font-medium cursor-pointer">
          Log In
        </button>
      </form>
    </>
  );
};

export default Signinform;
