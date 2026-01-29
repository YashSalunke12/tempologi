import React, { useState } from "react";
import { Star, Truck, User, Clock, FileText, MessageSquare } from "lucide-react";
import Header from "../../components/consignee/Header";
import Sidebar from "../../components/consignee/Sidebar";

export default function RatingsFeedback() {
  const [ratings, setRatings] = useState({
    driver: 0,
    vehicle: 0,
    timeliness: 0,
    overall: 0,
  });
  const [feedback, setFeedback] = useState("");
  const [complaint, setComplaint] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleRating = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar (mobile overlay + desktop fixed) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Ratings & Feedback
              </h1>
            </div>

            <div className="space-y-6">
              {/* Ratings Section */}
              <Section title="Post-Trip Ratings" icon={<User className="w-5 h-5" />}>
                <div className="space-y-4">
                  <RatingRow
                    label="Driver Behavior"
                    value={ratings.driver}
                    onChange={(v) => handleRating("driver", v)}
                  />
                  <RatingRow
                    label="Vehicle Condition"
                    value={ratings.vehicle}
                    onChange={(v) => handleRating("vehicle", v)}
                  />
                  <RatingRow
                    label="Timeliness"
                    value={ratings.timeliness}
                    onChange={(v) => handleRating("timeliness", v)}
                  />
                  <RatingRow
                    label="Overall Experience"
                    value={ratings.overall}
                    onChange={(v) => handleRating("overall", v)}
                  />
                </div>
              </Section>

              {/* Feedback */}
              <Section title="Feedback" icon={<FileText className="w-5 h-5" />}>
                <Label>Share your experience</Label>
                <TextArea
                  placeholder="Tell us about your trip..."
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Section>

              {/* Complaints */}
              <Section
                title="Complaints or Support Requests"
                icon={<MessageSquare className="w-5 h-5" />}
              >
                <Label>Submit a complaint / request</Label>
                <TextArea
                  placeholder="Describe any issue you faced..."
                  rows={3}
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                />
              </Section>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="w-full sm:w-auto">Submit Feedback</Button>
                <Button variant="secondary" className="w-full sm:w-auto">
                  Save Draft
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Inline Helper Components ---------------- */
function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border p-4 sm:p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-5">
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-base sm:text-lg font-semibold"> {title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}

function Label({ children, className = "" }) {
  return (
    <label className={`block text-sm font-medium mb-1 ${className}`}>
      {children}
    </label>
  );
}

function TextArea({ className = "", rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84] ${className}`}
      {...props}
    />
  );
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-[#211C84] text-white hover:bg-[#1a166b]",
    secondary:
      "bg-white text-[#211C84] border hover:bg-[#ebeafb]",
    ghost: "bg-transparent text-[#211C84] border border-dashed hover:bg-[#ebeafb]",
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

function RatingRow({ label, value, onChange }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 ${value >= star ? "text-yellow-500" : "text-gray-300"
              }`}
          >
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
      </div>
    </div>
  );
}
