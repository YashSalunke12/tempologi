import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Bell,
  CreditCard,
  Globe,
  Key,
  Save,
  X,
  Camera,
  CheckCircle,
} from "lucide-react";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";

export default function SettingsProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Rajesh Mehta",
    email: "rajesh@company.com",
    phone: "+91 98765 43210",
    position: "Head of Logistics",
    department: "Procurement",
    company: "Global Retail Corp",
    address: "123 Business Park, Mumbai, Maharashtra 400001",
    joinDate: "2022-04-15",
  });

  const [securityData, setSecurityData] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: "30 minutes",
    lastPasswordChange: "2024-02-15",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    weeklyReports: true,
    autoSave: true,
    language: "English",
    timezone: "IST (UTC+5:30)",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  const billingHistory = [
    { id: 1, date: "2024-03-15", description: "Wallet Top-up", amount: "₹2,00,000", status: "success" },
    { id: 2, date: "2024-02-28", description: "Monthly Subscription", amount: "₹15,000", status: "success" },
    { id: 3, date: "2024-02-15", description: "Wallet Top-up", amount: "₹1,50,000", status: "success" },
    { id: 4, date: "2024-01-30", description: "Monthly Subscription", amount: "₹15,000", status: "success" },
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("Updating profile:", profileData);
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log("Changing password...");
    alert("Password changed successfully!");
  };

  const handleSavePreferences = () => {
    console.log("Saving preferences:", preferences);
    alert("Preferences saved!");
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <Section title="Personal Information">
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1.5 sm:p-2 bg-[#211C84] text-white rounded-full hover:bg-[#1a166b]"
              >
                <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold truncate">{profileData.name}</h3>
              <p className="text-gray-600 truncate">{profileData.position}</p>
              <p className="text-sm text-gray-500">Member since {profileData.joinDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormField
              label="Full Name"
              icon={User}
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            />
            <FormField
              label="Email"
              type="email"
              icon={Mail}
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            />
            <FormField
              label="Phone Number"
              type="tel"
              icon={Phone}
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
            />
            <FormField
              label="Position"
              icon={User}
              value={profileData.position}
              onChange={(e) => setProfileData({...profileData, position: e.target.value})}
            />
            <FormField
              label="Department"
              icon={Building}
              value={profileData.department}
              onChange={(e) => setProfileData({...profileData, department: e.target.value})}
            />
            <FormField
              label="Company"
              icon={Building}
              value={profileData.company}
              onChange={(e) => setProfileData({...profileData, company: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <textarea
              className="w-full p-3 border rounded-xl min-h-[80px]"
              value={profileData.address}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              rows="2"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 sm:px-6 py-2 border rounded-xl hover:bg-gray-50 w-full sm:w-auto order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 bg-[#211C84] text-white rounded-xl hover:bg-[#1a166b] flex items-center justify-center gap-2 w-full sm:w-auto order-1 sm:order-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </Section>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Section title="Security Settings">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-xl gap-3 sm:gap-0">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm sm:text-base">Two-Factor Authentication</h4>
              <p className="text-xs sm:text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Toggle
              checked={securityData.twoFactorAuth}
              onChange={(checked) => setSecurityData({...securityData, twoFactorAuth: checked})}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-xl gap-3 sm:gap-0">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm sm:text-base">Login Alerts</h4>
              <p className="text-xs sm:text-sm text-gray-600">Get notified of new sign-ins</p>
            </div>
            <Toggle
              checked={securityData.loginAlerts}
              onChange={(checked) => setSecurityData({...securityData, loginAlerts: checked})}
            />
          </div>

          <div className="p-3 sm:p-4 border rounded-xl">
            <h4 className="font-medium mb-3 text-sm sm:text-base">Session Timeout</h4>
            <div className="flex flex-wrap gap-2">
              {["15 minutes", "30 minutes", "1 hour", "Never"].map((time) => (
                <button
                  key={time}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg flex-1 min-w-[100px] sm:min-w-0 ${
                    securityData.sessionTimeout === time
                      ? "bg-[#211C84] text-white"
                      : "border hover:bg-gray-50"
                  }`}
                  onClick={() => setSecurityData({...securityData, sessionTimeout: time})}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Change Password">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <FormField
            label="Current Password"
            type="password"
            icon={Key}
            placeholder="Enter current password"
          />
          <FormField
            label="New Password"
            type="password"
            icon={Key}
            placeholder="Enter new password"
          />
          <FormField
            label="Confirm New Password"
            type="password"
            icon={Key}
            placeholder="Confirm new password"
          />
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            Last changed on {securityData.lastPasswordChange}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 bg-[#211C84] text-white rounded-xl hover:bg-[#1a166b] w-full sm:w-auto"
            >
              Update Password
            </button>
          </div>
        </form>
      </Section>

      <Section title="Active Sessions">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-xl gap-3 sm:gap-0">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm sm:text-base">Chrome • Windows</p>
              <p className="text-xs sm:text-sm text-gray-600">Mumbai, India • Active now</p>
            </div>
            <button className="px-3 py-1 text-xs sm:text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 w-full sm:w-auto mt-2 sm:mt-0">
              Revoke
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-xl gap-3 sm:gap-0">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm sm:text-base">Safari • iPhone</p>
              <p className="text-xs sm:text-sm text-gray-600">Delhi, India • 2 days ago</p>
            </div>
            <button className="px-3 py-1 text-xs sm:text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 w-full sm:w-auto mt-2 sm:mt-0">
              Revoke
            </button>
          </div>
        </div>
      </Section>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <Section title="Notification Preferences">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-xl gap-3 sm:gap-0">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm sm:text-base">Email Notifications</h4>
              <p className="text-xs sm:text-sm text-gray-600">Receive updates via email</p>
            </div>
            <Toggle
              checked={preferences.emailNotifications}
              onChange={(checked) => setPreferences({...preferences, emailNotifications: checked})}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-xl gap-3 sm:gap-0">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm sm:text-base">Push Notifications</h4>
              <p className="text-xs sm:text-sm text-gray-600">Get alerts in your browser</p>
            </div>
            <Toggle
              checked={preferences.pushNotifications}
              onChange={(checked) => setPreferences({...preferences, pushNotifications: checked})}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-xl gap-3 sm:gap-0">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm sm:text-base">SMS Alerts</h4>
              <p className="text-xs sm:text-sm text-gray-600">Critical alerts via SMS</p>
            </div>
            <Toggle
              checked={preferences.smsAlerts}
              onChange={(checked) => setPreferences({...preferences, smsAlerts: checked})}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-xl gap-3 sm:gap-0">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm sm:text-base">Weekly Reports</h4>
              <p className="text-xs sm:text-sm text-gray-600">Receive weekly performance reports</p>
            </div>
            <Toggle
              checked={preferences.weeklyReports}
              onChange={(checked) => setPreferences({...preferences, weeklyReports: checked})}
            />
          </div>
        </div>
      </Section>

      <Section title="General Preferences">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              className="w-full p-3 border rounded-xl text-sm sm:text-base"
              value={preferences.language}
              onChange={(e) => setPreferences({...preferences, language: e.target.value})}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
              <option>Gujarati</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Timezone</label>
            <select
              className="w-full p-3 border rounded-xl text-sm sm:text-base"
              value={preferences.timezone}
              onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
            >
              <option>IST (UTC+5:30)</option>
              <option>UTC</option>
              <option>EST (UTC-5)</option>
              <option>PST (UTC-8)</option>
            </select>
          </div>
        </div>
      </Section>

      <div className="flex justify-end">
        <button
          onClick={handleSavePreferences}
          className="px-4 sm:px-6 py-2 bg-[#211C84] text-white rounded-xl hover:bg-[#1a166b] flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Save className="w-4 h-4" />
          Save Preferences
        </button>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <Section title="Billing Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="border rounded-xl p-3 sm:p-4">
            <h4 className="font-medium mb-3 text-sm sm:text-base">Current Plan</h4>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-base sm:text-lg font-bold text-blue-700">Enterprise Plan</p>
              <p className="text-xs sm:text-sm text-blue-600">₹15,000/month</p>
            </div>
            <ul className="space-y-1 sm:space-y-2 mt-3 sm:mt-4 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                Unlimited Shipments
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                Priority Support
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                Advanced Analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                20 User Accounts
              </li>
            </ul>
            <button className="w-full mt-3 sm:mt-4 px-3 sm:px-4 py-2 text-sm border rounded-xl hover:bg-gray-50">
              Upgrade Plan
            </button>
          </div>

          <div className="border rounded-xl p-3 sm:p-4">
            <h4 className="font-medium mb-3 text-sm sm:text-base">Payment Methods</h4>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base">Visa ending in 4242</p>
                    <p className="text-xs sm:text-sm text-gray-600">Expires 12/2025</p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-green-600 mt-1 sm:mt-0">Default</span>
              </div>
              <button className="w-full px-3 sm:px-4 py-2 text-sm border border-dashed rounded-xl hover:bg-gray-50">
                + Add Payment Method
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Billing History">
        <div className="overflow-x-auto -mx-3 sm:-mx-0">
          <div className="min-w-[600px] sm:min-w-0">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 sm:p-3 text-left">Date</th>
                  <th className="p-2 sm:p-3 text-left">Description</th>
                  <th className="p-2 sm:p-3 text-left">Amount</th>
                  <th className="p-2 sm:p-3 text-left">Status</th>
                  <th className="p-2 sm:p-3 text-left">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 sm:p-3">{item.date}</td>
                    <td className="p-2 sm:p-3">{item.description}</td>
                    <td className="p-2 sm:p-3 font-medium">{item.amount}</td>
                    <td className="p-2 sm:p-3">
                      <span className="px-2 sm:px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2 sm:p-3">
                      <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded-lg hover:bg-gray-50">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold truncate">Settings & Profile</h1>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm ${
                      activeTab === tab.id
                        ? "bg-[#211C84] text-white"
                        : "border hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="min-w-0">
              {activeTab === "profile" && renderProfileTab()}
              {activeTab === "security" && renderSecurityTab()}
              {activeTab === "notifications" && renderPreferencesTab()}
              {activeTab === "billing" && renderBillingTab()}
              {activeTab === "preferences" && renderPreferencesTab()}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

function FormField({ label, type = "text", icon: Icon, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <input
          type={type}
          className="w-full pl-9 sm:pl-10 p-2 sm:p-3 border rounded-xl text-sm sm:text-base"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors flex-shrink-0 ${checked ? "bg-[#211C84]" : "bg-gray-300"}`}
      onClick={() => onChange(!checked)}
    >
      <div
        className={`bg-white w-4 h-4 sm:w-5 sm:h-5 rounded-full transform transition-transform ${checked ? "translate-x-5 sm:translate-x-7" : "translate-x-1"} translate-y-0.5`}
      />
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
      {title && (
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
}