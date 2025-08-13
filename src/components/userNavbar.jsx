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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <div>
      <div className="border-b-[1.8px] lg:px-16 border-gray-100 h-16 flex items-center justify-between px-4 max-w-screen">
        <nav className="flex items-center justify-between w-full px-2">
          <div className="flex sm:hidden items-center justify-between w-full">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setDropdown(false); // Close desktop dropdown when opening mobile menu
              }}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <svg
                className={`w-6 h-6 transition-transform ${
                  mobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <h1
              className="text-xl font-bold cursor-pointer absolute left-1/2 transform -translate-x-1/2"
              onClick={() => navigate("/")}
            >
              Bartr
            </h1>

            <button
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
              onMouseDown={(e) => {
                e.stopPropagation();
                setDropdown((prev) => !prev);
                setMobileMenuOpen(false); // Close mobile menu when opening dropdown
              }}
            >
              <span className="font-bold text-sm truncate max-w-[50px]">
                {user?.firstName}
              </span>
              <svg
                className={`w-3 h-3 transition-transform ${
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
          </div>

          <div className="hidden sm:flex items-center gap-4 sm:gap-6 lg:gap-10 basis-[42%]">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Bartr
            </h1>
            <div className="flex items-center gap-4 lg:gap-6">
              <p
                className="cursor-pointer text-sm lg:text-base hover:text-blue-600 transition-colors"
                onClick={() => navigate("/categories")}
              >
                Categories
              </p>
              <p
                className="cursor-pointer text-sm lg:text-base hover:text-blue-600 transition-colors"
                onClick={() => navigate("/howitworks")}
              >
                How it works
              </p>
              <p
                className="cursor-pointer text-sm lg:text-base hover:text-blue-600 transition-colors"
                onClick={() => navigate("/faqs")}
              >
                FAQs
              </p>
            </div>
          </div>

          <div className="hidden sm:flex basis-[52%] items-center justify-end gap-4 lg:gap-6">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-2 pr-10 border border-gray-300 rounded-xl bg-gray-100 placeholder:text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
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
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setDropdown((prev) => !prev);
                }}
              >
                <span className="font-bold text-base">{user?.firstName}</span>
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
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2"
                >
                  <div className="px-4 py-2 text-gray-700 font-semibold border-b">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setDropdown(false);
                      }}
                      className="w-full text-left text-green-700"
                    >
                      {user?.firstName} {user?.lastName}
                    </button>
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

      {mobileMenuOpen && (
        <div
          className="sm:hidden fixed inset-0 z-50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-16 w-80 max-w-[85vw] h-[calc(100vh-64px)] bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl bg-gray-50 placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                />
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
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
            </div>

            <div className="py-4">
              <button
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-lg font-medium text-gray-800">Home</span>
              </button>

              <button
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => {
                  navigate("/categories");
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-lg font-medium text-gray-800">
                  Categories
                </span>
              </button>

              <button
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => {
                  navigate("/howitworks");
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-lg font-medium text-gray-800">
                  How it works
                </span>
              </button>

              <button
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => {
                  navigate("/faqs");
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-lg font-medium text-gray-800">FAQs</span>
              </button>
            </div>

            <div className="border-t border-gray-200 py-4">
              <div className="px-6 py-3 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </div>

              <button
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-lg font-medium text-gray-800">
                  Dashboard
                </span>
              </button>

              <button
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  navigate("/profile");
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-lg font-medium text-gray-800">
                  Profile
                </span>
              </button>

              <button
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  navigate("/list-item");
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-lg font-medium text-blue-600">
                  List an Item
                </span>
              </button>

              <button
                className="w-full text-left px-6 py-4 hover:bg-red-50 transition-colors border-t border-gray-200 mt-4"
                onClick={handleLogout}
              >
                <span className="text-lg font-medium text-red-600">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserNavbar;
