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
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </a>
              <a href="/signup" className="text-gray-600 hover:text-gray-900">
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
