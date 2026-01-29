import React, { useState, useEffect } from "react";
import { Truck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RegistrationOtpVerification() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const navigate = useNavigate();

    // Countdown effect
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    // Handle OTP input change
    const handleChange = (value, index) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto focus next input
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-md w-full mx-auto flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full">
                {/* Logo + Title */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#211C84] flex items-center justify-center mb-3">
                        <Truck className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#211C84]">TempoLogi</h1>
                    <p className="text-sm text-gray-600">SignUp</p>
                </div>

                {/* OTP Title */}
                <div className="text-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Verify your mobile number
                    </h2>
                    <p className="text-sm text-gray-600">
                        Enter the OTP sent to +91
                    </p>
                </div>

                {/* OTP Input Boxes */}
                <div className="flex justify-center gap-3 mb-4">
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            id={`otp-${idx}`}
                            type="text"
                            value={digit}
                            maxLength={1}
                            onChange={(e) => handleChange(e.target.value, idx)}
                            className="w-12 h-12 sm:w-14 sm:h-14 text-center border rounded-xl text-lg font-semibold outline-none focus:ring-2 focus:ring-[#211C84]"
                        />
                    ))}
                </div>

                {/* Resend Timer */}
                <p className="text-center text-sm text-gray-600 mb-6">
                    {timer > 0 ? (
                        <>Resend OTP in {timer}s</>
                    ) : (
                        <button
                            onClick={() => setTimer(30)}
                            className="text-[#211C84] font-medium hover:underline"
                        >
                            Resend OTP
                        </button>
                    )}
                </p>

                {/* Verify Button */}
                <Button
                    className="w-full mb-4"
                    onClick={() => navigate("/kyc-upload")}
                >
                    Verify & Continue
                </Button>

                {/* Back Link */}
                <div className="flex justify-center">
                    <button
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#211C84]"
                        onClick={() => navigate("/signup")}
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                </div>
            </Card>
        </main>
    );
}

/* ---------------- Helper Components ---------------- */
function Card({ children, className = "" }) {
    return (
        <div
            className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm ${className}`}
        >
            {children}
        </div>
    );
}

function Button({ children, variant = "primary", className = "", ...props }) {
    const variants = {
        primary: "bg-[#211C84] text-white hover:bg-[#1a166b]",
        secondary: "bg-white text-[#211C84] border hover:bg-[#ebeafb]",
    };
    return (
        <button
            className={`px-4 py-2 rounded-2xl text-sm font-medium ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
