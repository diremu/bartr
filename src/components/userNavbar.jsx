import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../userSlice";
import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router";

const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div className="border-b-[1.8px] lg:px-16 border-gray-100 h-16 flex items-center justify-between px-4 max-w-screen">
        <nav className="flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-10 basis-[42%]">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Bartr
            </h1>
            <p className="cursor-pointer" onClick={() => navigate("/")}>
              Home
            </p>
            <p
              className="cursor-pointer"
              onClick={() => navigate("/categories")}
            >
              Categories
            </p>
            <p
              className="cursor-pointer"
              onClick={() => navigate("/howitworks")}
            >
              How it works
            </p>
            <p className="cursor-pointer" onClick={() => navigate("/faqs")}>
              FAQs
            </p>
          </div>
          <div className="basis-[52%] flex items-center justify-end gap-6">
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
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-3xl text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                onMouseDown={e => {
                  e.stopPropagation();
                  setDropdown(prev => !prev);
                }}
              >
                <span className="font-bold">{user?.firstName}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    dropdown ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2"
                >
                  <div className="px-4 py-2 text-gray-700 font-semibold border-b">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 font-semibold"
                    onClick={() => {
                      setDropdown(false);
                      navigate("/dashboard");
                    }}
                  >
                    Dashboard
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 font-semibold"
                    onClick={() => {
                      setDropdown(false);
                      navigate("/list-item");
                    }}
                  >
                    List an Item
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserNavbar;
