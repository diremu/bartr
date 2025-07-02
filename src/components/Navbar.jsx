import { Outlet, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div className="border-b-[1.8px] border-gray-100 h-16 flex items-center justify-between px-4 max-w-screen">
      <nav className="flex items-center justify-between w-full px-2">
        <div className="flex items-center gap-10 basis-[50%]">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>Bartr</h1>
          <p className="cursor-pointer" onClick={() => navigate("/")}>Home</p>
          <p className="cursor-pointer" onClick={() => navigate("/categories")}>Categories</p>
          <p className="cursor-pointer" onClick={() => navigate("/howitworks")}>How it works</p>
          <p className="cursor-pointer" onClick={() => navigate("/faqs")}>FAQs</p>
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

          <div className="flex gap-2 items-center">
            <button className="bg-blue-400 px-4 text-[14px] font-semibold py-2 rounded-3xl text-white hover:bg-blue-500 transition-colors">
              List an Item
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.firstName}!
                </span>
                <button 
                  onClick={handleLogout}
                  className="py-2 px-4 font-semibold text-[14px] bg-red-100 text-red-700 rounded-3xl hover:bg-red-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-1">
                <button 
                  onClick={() => navigate("/login")}
                  className="py-2 px-2 font-semibold text-[14px] text-blue-600 rounded-3xl hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate("/signup")}
                  className="py-2 px-2 font-semibold text-[14px] bg-gray-200 rounded-3xl hover:bg-gray-300 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
    <Outlet />
    </div>
  );
};

export default Navbar;
