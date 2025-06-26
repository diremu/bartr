import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="border-b-[1.8px] border-gray-100 h-16 flex items-center justify-between px-4 max-w-screen">
      <nav className="flex items-center justify-between w-full px-2">
        <div className="flex items-center gap-10 basis-[50%]">
          <h1 className="text-2xl font-bold">Bartr</h1>
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/categories")}>Categories</p>
          <p onClick={() => navigate("/howitworks")}>How it works</p>
          <p onClick={() => navigate("/faqs")}>FAQs</p>
        </div>
        <div className="basis-[45%] flex items-center justify-between">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 pr-10 border border-gray-300 rounded-xl bg-gray-100 placeholder:text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </span>
          </div>

          <div className="flex gap-2">
            <button className="bg-blue-400 px-4 text-[14px] font-semibold py-2 rounded-3xl text-white">
              List an Item
            </button>
            <button className="py-2 px-4 font-semibold text-[14px] bg-gray-200 rounded-3xl">
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
