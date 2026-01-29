import React, { useState } from "react";
import { Truck, IdCard, CreditCard, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function KycUpload() {
    const [files, setFiles] = useState({
        aadhar: null,
        pan: null,
        gst: null,
    });

    const navigate = useNavigate();

    const handleFileChange = (field, event) => {
        const file = event.target.files[0];
        if (file) {
            setFiles((prev) => ({ ...prev, [field]: file.name }));
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
                    <p className="text-sm text-gray-600">Document Verification</p>
                </div>

                {/* Instructions */}
                <p className="text-center text-sm text-gray-600 mb-6">
                    Please upload the following documents to complete your registration
                </p>

                {/* Upload Sections */}
                <Section>
                    <Label>Aadhar Card</Label>
                    <UploadBox
                        icon={<IdCard className="w-6 h-6 text-[#211C84]" />}
                        text={files.aadhar || "Upload Aadhar Card"}
                        onChange={(e) => handleFileChange("aadhar", e)}
                    />
                </Section>

                <Section>
                    <Label>PAN Card</Label>
                    <UploadBox
                        icon={<CreditCard className="w-6 h-6 text-[#211C84]" />}
                        text={files.pan || "Upload PAN Card"}
                        onChange={(e) => handleFileChange("pan", e)}
                    />
                </Section>

                <Section>
                    <Label>GST Certificate</Label>
                    <UploadBox
                        icon={<FileText className="w-6 h-6 text-[#211C84]" />}
                        text={files.gst || "Upload GST Certificate"}
                        onChange={(e) => handleFileChange("gst", e)}
                    />
                </Section>

                {/* Submit Button */}
                <div className="mt-6">
                    <Button
                        className="w-full"
                        onClick={() => navigate("/login")}
                    >
                        Submit Documents
                    </Button>
                </div>

                {/* Back Button */}
                <div className="flex justify-center mt-4">
                    <button
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#211C84]"
                        onClick={() => navigate("/registration-otp-verification")}
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

function Section({ children, className = "" }) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
}

function Label({ children, className = "" }) {
    return (
        <label className={`block text-sm font-medium mb-2 ${className}`}>
            {children}
        </label>
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

function UploadBox({ icon, text, onChange }) {
    return (
        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#cbc9f2] rounded-xl py-6 cursor-pointer hover:bg-gray-50">
            {icon}
            <span className="text-sm text-[#211C84] font-medium">{text}</span>
            <input type="file" className="hidden" onChange={onChange} />
        </label>
    );
}
