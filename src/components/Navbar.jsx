import { Outlet, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { 
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <div className="border-b-[1.8px] border-gray-100 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-[5%] max-w-screen relative">
        <nav className="hidden lg:flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-10 basis-[42%]">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              Bartr
            </h1>
            <p className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleNavigation("/")}>
              Home
            </p>
            <p className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleNavigation("/categories")}>
              Categories
            </p>
            <p className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleNavigation("/howitworks")}>
              How it works
            </p>
            <p className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleNavigation("/faqs")}>
              FAQs
            </p>
          </div>
          <div className="basis-[52%] flex items-center justify-between">
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

            <div className="flex gap-2 w-full items-center justify-around">
              {isAuthenticated ? (
                <div className="flex w-full justify-around items-center">
                  <button className="bg-blue-400 px-4 text-[14px] font-semibold py-2 rounded-3xl text-white hover:bg-blue-500 transition-colors">
                    List an Item
                  </button>
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
                <div className="flex gap-6 w-full justify-center">
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="py-2 px-2 xl:px-4 font-semibold text-[14px] text-blue-600 rounded-3xl hover:bg-blue-50 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="py-2 px-2 xl:px-4 font-semibold text-[14px] bg-gray-200 rounded-3xl hover:bg-gray-300 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="lg:hidden flex items-center justify-between w-full">
          <h1
            className="text-xl sm:text-2xl font-bold cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            Bartr
          </h1>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 lg:hidden">
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50 placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

              <div className="space-y-3 border-t pt-4">
                <button 
                  className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 rounded-md transition-colors"
                  onClick={() => handleNavigation("/")}
                >
                  Home
                </button>
                <button 
                  className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 rounded-md transition-colors"
                  onClick={() => handleNavigation("/categories")}
                >
                  Categories
                </button>
                <button 
                  className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 rounded-md transition-colors"
                  onClick={() => handleNavigation("/howitworks")}
                >
                  How it works
                </button>
                <button 
                  className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 rounded-md transition-colors"
                  onClick={() => handleNavigation("/faqs")}
                >
                  FAQs
                </button>
              </div>

              <div className="border-t pt-4 space-y-3">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <button className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                      List an Item
                    </button>
                    <div className="text-sm text-gray-600 text-center py-2">
                      Welcome, {user?.firstName}!
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 px-4 font-semibold bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleNavigation("/login")}
                      className="w-full py-2.5 px-4 font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleNavigation("/signup")}
                      className="w-full py-2.5 px-4 font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
