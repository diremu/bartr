import { useSelector } from "react-redux";
import { useState } from "react";
import emailjs from "@emailjs/browser"
import { Link } from "react-router";
import { useNavigate } from "react-router";
import {makeOTP} from '../userSlice'

const ForgotPassword = () => {
    const users = useSelector((state) => state.user.users);
    const email = users.map((user) => user.email);
    console.log(email)
    const [userEmail, setUserEmail] = useState("");
    const [error, setError] = useState("");
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();
    const otp = useSelector((state) => state.user.otp)
    const newOtp = makeOTP("haha");
    console.log(newOtp)
    console.log(otp)


    function onSubmit(e) {
        e.preventDefault();
        setError("");
        if (!basicRegex.test(userEmail)) {
            setError("Invalid email format");
            return;
        }
        if (email.includes(userEmail)) {
            const emailTemplate = {
                email: userEmail,
                passcode: otp,
                time: new Date().toLocaleTimeString(),
            }
            console.log(emailTemplate);
            emailjs.send(
                import.meta.env.VITE_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                emailTemplate,
                import.meta.env.VITE_PUBLIC_KEY
            ).then((response) => {
                console.log("Email sent successfully", response.status, response.text);
                if (response.status === 200) {
                    navigate("/otp")
                }
            }, (error) => {
                console.log("An error occurred", error)
            })
            // console.log(import.meta.env.VITE_SERVICE_ID);
        }else if(userEmail.trim() === "") {
            setError("Input your email")
        } else {
            setError("Email not found");
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
                    {error && <p className="text-red-500 my-2 inline-block ">{error}.</p>}
                    {error === "Email not found" && (
                        <p className="text-blue-500 my-2 inline-block">
                            If you don't have an account, please <Link to="/register" className="underline">register</Link>.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;