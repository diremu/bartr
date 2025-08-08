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


  function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!basicRegex.test(userEmail)) {
      setError("Invalid email format");
      return;
    }
    if (email.includes(userEmail)) {
      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      dispatch(makeOTP({ user: userEmail, otp: generatedOTP }));
      
      const emailTemplate = {
        email: userEmail,
        passcode: generatedOTP,
        time: new Date().toLocaleTimeString(),
      };
      console.log(emailTemplate);
      emailjs
        .send(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          emailTemplate,
          import.meta.env.VITE_PUBLIC_KEY
        )
        .then(
          (response) => {
            console.log(
              "Email sent successfully",
              response.status,
              response.text
            );
            if (response.status === 200) {
              sendCode(true);
              setError("");
              verifyCorrectCode(false);}
          },
          (error) => {
            console.log("An error occurred", error);
          }
        );
      // console.log(import.meta.env.VITE_SERVICE_ID);
    } else if (userEmail.trim() === "") {
      setError("Input your email");
    } else {
      setError("Email not found");
    }
  }

  function checkCode(e) {
    e.preventDefault();
    setError("");
    if (userOtp.trim().length !== 6) {
      setError("Invalid OTP. Please enter a 6-digit code.");
      verifyCorrectCode(false);
      return;
    }
    if (userOtp === pin.otp) {
      verifyCorrectCode(true);
      console.log("OTP verification successful");
    } else {
      setError("Wrong Code. Please try again");
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {!code && !correctCode ? (
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Forgot Password
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userEmail}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
            {error && (
              <p className="text-red-500 my-2 inline-block ">{error}.</p>
            )}
            {error === "Email not found" && (
              <p className="text-blue-500 my-2 inline-block">
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
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Enter OTP
          </h2>
          <form onSubmit={checkCode}>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={userOtp}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your OTP"
                onChange={(e) => setUserOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify OTP
            </button>
            {error && <p className="text-red-500 my-2 inline-block">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Enter a new password
          </h2>
          <form onSubmit={handleNewPassword}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={newPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your new password"
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Confirm New Password
            </button>
            {error && <p className="text-red-500 my-2 inline-block">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
