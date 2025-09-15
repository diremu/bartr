import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { makeOTP } from "../userSlice";
import { forgotPasswordChange } from "../userSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const email = users.map((user) => user.email);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [code, sendCode] = useState(false);
  const [correctCode, verifyCorrectCode] = useState(false);
  const [newPassword, setNewPass] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const pin = useSelector((state) => state.user.otp);

  const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();


  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!basicRegex.test(userEmail)) {
      setError("Invalid email format");
      return;
    }
    try {
      const response = await fetch("/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail })
      });
      const data = await response.json();
      if (response.ok) {
        sendCode(true);
        setError("");
        verifyCorrectCode(false);
      } else {
        setError(data.message || "Failed to generate OTP");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  }

  async function checkCode(e) {
    e.preventDefault();
    setError("");
    if (userOtp.trim().length !== 6) {
      setError("Invalid OTP. Please enter a 6-digit code.");
      verifyCorrectCode(false);
      return;
    }
    try {
      const response = await fetch("/otp/otp-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, otp: userOtp })
      });
      const data = await response.json();
      if (response.ok) {
        verifyCorrectCode(true);
        setError("");
      } else {
        setError(data.message || "Wrong Code. Please try again");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  }

  function handleNewPassword(e) {
    e.preventDefault();
    setError("");
    const currentPassword = users.filter((user) => user.email === userEmail)[0]
      .password;
    if (newPassword.trim() === "") {
      setError("Please enter a new password");
      return;
    } else if (newPassword === currentPassword) {
      setError("Your new password must be different from your old one");
    } else {
      console.log("successful");
      dispatch(
        forgotPasswordChange({ email: userEmail, newPassword: newPassword })
      );
      navigate("/");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4 px-3 sm:py-8 sm:px-6">
      {!code && !correctCode ? (
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-4 sm:p-6 lg:p-8 rounded-md shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
            Forgot Password
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userEmail}
                className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter your email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all duration-200"
            >
              Reset Password
            </button>
            {error && (
              <p className="text-red-500 my-2 inline-block text-xs sm:text-sm">{error}.</p>
            )}
            {error === "Email not found" && (
              <p className="text-blue-500 my-2 inline-block text-xs sm:text-sm">
                If you don't have an account, please{" "}
                <Link to="/register" className="underline">
                  register
                </Link>
                .
              </p>
            )}
          </form>
        </div>
      ) : !correctCode && code ? (
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-4 sm:p-6 lg:p-8 rounded-md shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
            Enter OTP
          </h2>
          <form onSubmit={checkCode}>
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="otp"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={userOtp}
                className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter your OTP"
                onChange={(e) => setUserOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all duration-200"
            >
              Verify OTP
            </button>
            {error && <p className="text-red-500 my-2 inline-block text-xs sm:text-sm">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-4 sm:p-6 lg:p-8 rounded-md shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
            Enter a new password
          </h2>
          <form onSubmit={handleNewPassword}>
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={newPassword}
                className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="Enter your new password"
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all duration-200"
            >
              Confirm New Password
            </button>
            {error && <p className="text-red-500 my-2 inline-block text-xs sm:text-sm">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
