

const Signinform = () => {
  return (
    <>
      <form action="" className="h-screen flex items-center justify-center lg:w-1/2">
        <div className="bg-white shadow-lg rounded-lg p-6 border border-zinc-100 flex flex-col w-96 space-y-5">
          <div className="flex flex-col space-y-2">
            <label className="text-md md:text-lg text-zinc-800">Username</label>
            <input type="text" className="py-1.5 px-3 border border-gray-300 rounded focus:outline-none" />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-md md:text-lg text-zinc-800">Password</label>
            <input type="text" className="py-1.5 px-3 border border-gray-300 rounded focus:outline-none" />
          </div>
          <button className="bg-emerald-600 text-white rounded py-2 font-semibold">Log In</button>
        </div>
      </form>
    </>
  );
};

export default Signinform;
