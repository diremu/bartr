import { Outlet } from "react-router";

export default function AuthNavbar() {
  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-gray-800">
                Bartr
              </a>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <a 
                href="/login" 
                className="px-3 py-3 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 rounded-md hover:bg-gray-50"
              >
                Login
              </a>
              <a 
                href="/signup" 
                className="px-3 py-3 sm:px-4 sm:py-2 text-sm sm:text-base bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
