import { useState } from "react";

const OTPPage = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (otp.trim().length !== 6) {
            setError("Invalid OTP. Please enter a 6-digit code.");
            return;
        }
        console.log("OTP Submitted: ", otp);
        };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Enter OTP</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={otp}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your OTP"
                            onChange={(e) => setOtp(e.target.value)}
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
        </div>
    );
};

export default OTPPage;
