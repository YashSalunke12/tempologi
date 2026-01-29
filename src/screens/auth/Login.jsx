import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Truck, User, Building2, Mail, Lock, Shield } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState("Consignee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const roles = [
    { label: "Tempo Owner", icon: <Truck className="w-4 h-4" /> },
    { label: "Consignee", icon: <User className="w-4 h-4" /> },
    { label: "Corporate Client", icon: <Building2 className="w-4 h-4" /> },
    { label: "Admin", icon: <Shield className="w-4 h-4" /> },
  ];

  // Dummy credentials for each role
  const dummyCredentials = {
    "Tempo Owner": { email: "tempoowner@example.com", password: "password123" },
    "Consignee": { email: "consignee@example.com", password: "password123" },
    "Corporate Client": { email: "corporate@example.com", password: "password123" },
    "Admin": { email: "admin@tempologi.com", password: "admin123" }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // For demo purposes, accept any email/password combination
    // In real app, you would validate against your backend
    console.log(`Logging in as ${role} with email: ${email}`);
    
    // Navigate to role-specific dashboard
    navigate(`/${role.toLowerCase().replace(/\s+/g, '-')}/dashboard`);
  };

  // Quick login with dummy credentials
  const handleQuickLogin = () => {
    const creds = dummyCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
    
    // Auto-login after 500ms for better UX
    setTimeout(() => {
      navigate(`/${role.toLowerCase().replace(/\s+/g, '-')}/dashboard`);
    }, 500);
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
          <p className="text-sm text-gray-600">Login to your account</p>
        </div>

        {/* Role Selection */}
        <Section>
          <Label>Select Role</Label>
          <div className="space-y-2">
            {roles.map((r) => (
              <button
                type="button"
                key={r.label}
                onClick={() => {
                  setRole(r.label);
                  // Auto-fill dummy credentials when switching roles
                  const creds = dummyCredentials[r.label];
                  setEmail(creds.email);
                  setPassword(creds.password);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium
                  ${role === r.label
                    ? "bg-[#ebeafb] border-[#211C84] text-[#211C84] font-semibold"
                    : "hover:bg-gray-50"
                  }`}
              >
                {r.icon} {r.label}
              </button>
            ))}
          </div>
        </Section>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <Section>
            <Label>Email Address</Label>
            <div className="flex items-center border rounded-xl overflow-hidden">
              <span className="px-3 text-gray-600">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 outline-none text-sm"
                required
              />
            </div>
          </Section>

          {/* Password Field */}
          <Section>
            <div className="flex justify-between items-center mb-1">
              <Label>Password</Label>
              <Link to="/forgot-password" className="text-xs text-[#211C84] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="flex items-center border rounded-xl overflow-hidden">
              <span className="px-3 text-gray-600">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="flex-1 px-3 py-2 outline-none text-sm"
                required
              />
            </div>
          </Section>

          {/* Quick Login Button (using dummy credentials) */}
          <div className="mb-4">
            <Button
              type="button"
              variant="secondary"
              className="w-full text-xs"
              onClick={handleQuickLogin}
            >
              Quick Login as {role} (Use Demo Credentials)
            </Button>
          </div>

          {/* Login Button */}
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </div>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#211C84] font-semibold">
            Sign up
          </Link>
        </p>

        {/* Demo Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-800 text-center">
            <strong>Demo:</strong> Each role has pre-filled credentials. Select a role and click "Quick Login"
          </p>
          <p className="text-xs text-gray-600 text-center mt-1">
            Admin: admin@tempologi.com / admin123
          </p>
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
    <label className={`block text-sm font-medium mb-1 ${className}`}>
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
      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}