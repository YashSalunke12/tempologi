import React from "react";
import { Bell, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

function IconButton({ children, ariaLabel }) {
    return (
        <button aria-label={ariaLabel} className="p-2 rounded-xl hover:bg-[#ebeafb] border">
            {children}
        </button>
    );
}

export default function Header({ onMenuClick }) {
    const navigate = useNavigate();
    return (
        <header className="sticky top-0 z-30 bg-white border-b">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Mobile menu button */}
                    <button
                        className="lg:hidden p-2 rounded-xl hover:bg-[#ebeafb]"
                        onClick={onMenuClick}
                        aria-label="Open sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="font-semibold">TempoLogi</div>
                </div>

                <div className="flex items-center gap-2">
                    <IconButton ariaLabel="Notifications">
                        <Bell className="w-5 h-5" />
                    </IconButton>
                    <div className="relative">
                        <button className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-[#ebeafb]" onClick={() => navigate("/consignee/settings-profile")}>
                            <User className="w-5 h-5" />
                            <span className="hidden sm:inline text-sm">Profile</span>
                        </button>
                        {/* Optional: dropdown on click */}
                    </div>
                </div>
            </div>
        </header>
    );
}