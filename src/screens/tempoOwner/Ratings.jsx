import React, { useState } from "react";
import {
  Star,
  Calendar,
  User,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";

export default function Ratings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [tripId, setTripId] = useState("");

  // Sample ratings data
  const ratings = [
    {
      id: "TRIP1001",
      name: "Ramesh Sharma",
      score: 5,
      comment: "Excellent service! Driver was punctual and professional.",
      date: "2025-09-01",
    },
    {
      id: "TRIP1002",
      name: "Anita Verma",
      score: 4,
      comment: "Good experience overall. Vehicle was clean.",
      date: "2025-08-30",
    },
    {
      id: "TRIP1003",
      name: "Ajay Kumar",
      score: 3,
      comment: "Delivery was delayed, but driver kept me updated.",
      date: "2025-08-28",
    },
  ];

  const filteredRatings = ratings.filter((r) => {
    const dateMatch =
      (!dateRange.from || r.date >= dateRange.from) &&
      (!dateRange.to || r.date <= dateRange.to);
    const tripMatch = !tripId || r.id.includes(tripId);
    return dateMatch && tripMatch;
  });

  const averageScore =
    ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Ratings & Reviews
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="lg:col-span-2 space-y-6">
                <Section title="Average Rating">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(averageScore)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-semibold">
                      {averageScore.toFixed(1)} / 5
                    </span>
                  </div>
                </Section>

                <Section title="Filters">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label>Trip ID</Label>
                      <Input
                        placeholder="Search Trip ID"
                        value={tripId}
                        onChange={(e) => setTripId(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>From</Label>
                      <Input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, from: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>To</Label>
                      <Input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, to: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Section>

                <Section title="Recent Ratings">
                  <div className="space-y-4">
                    {filteredRatings.map((r) => (
                      <RatingCard key={r.id} rating={r} />
                    ))}
                  </div>
                </Section>
              </div>

              {/* Column 2 (Summary/Help) */}
              <aside className="lg:col-span-1 space-y-6">
                <Card className="top-4">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Monitor
                      customer satisfaction trends.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> High ratings
                      improve visibility.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Respond to
                      feedback to build trust.
                    </li>
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    Contact our support team for feedback-related queries.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="secondary">Chat Now</Button>
                    <Button variant="ghost">View FAQs</Button>
                  </div>
                </Card>
              </aside>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */
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
          <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
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

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84] ${className}`}
      {...props}
    />
  );
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-[#211C84] text-white hover:bg-[#1a166b]",
    secondary: "bg-white text-[#211C84] border hover:bg-[#ebeafb]",
    ghost:
      "bg-transparent text-[#211C84] border border-dashed hover:bg-[#ebeafb]",
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

/* ---------------- Rating Card ---------------- */
function RatingCard({ rating }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-500" />
          <span className="font-medium">{rating.name}</span>
        </div>
        <span className="text-xs text-gray-500">{rating.date}</span>
      </div>
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating.score
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-700">{rating.comment}</p>
      <p className="text-xs text-gray-500 mt-2">Trip: {rating.id}</p>
    </div>
  );
}
