import React, { useState } from "react";
import {
  Bell,
  Check,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  CreditCard,
  FileText,
  Truck,
  Filter,
  ChevronRight,
  Settings,
} from "lucide-react";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "shipment",
      title: "Shipment Delivered",
      message: "Shipment SH-78904 has been successfully delivered to Delhi Distribution Center.",
      time: "10 minutes ago",
      read: false,
      priority: "success",
      shipmentId: "SH-78904",
    },
    {
      id: 2,
      type: "delay",
      title: "Delay Alert",
      message: "Shipment SH-78903 is delayed by 2 hours due to traffic near Kanpur.",
      time: "1 hour ago",
      read: false,
      priority: "urgent",
      shipmentId: "SH-78903",
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Successful",
      message: "Payment of ₹45,000 for invoice INV-4567 has been processed successfully.",
      time: "2 hours ago",
      read: true,
      priority: "success",
      invoiceId: "INV-4567",
    },
    {
      id: 4,
      type: "contract",
      title: "Contract Renewal Reminder",
      message: "Contract with ABC Logistics expires in 7 days. Please review renewal options.",
      time: "1 day ago",
      read: true,
      priority: "warning",
      contractId: "CT-001",
    },
    {
      id: 5,
      type: "approval",
      title: "Booking Approval Required",
      message: "New booking request from Rajesh Mehta requires your approval.",
      time: "2 days ago",
      read: true,
      priority: "info",
      requestId: "BR-456",
    },
    {
      id: 6,
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance on March 20, 2024 (2:00 AM - 4:00 AM). Service may be interrupted.",
      time: "3 days ago",
      read: true,
      priority: "info",
    },
    {
      id: 7,
      type: "shipment",
      title: "Shipment Picked Up",
      message: "Shipment SH-78902 has been picked up from Bangalore Factory.",
      time: "3 days ago",
      read: true,
      priority: "success",
      shipmentId: "SH-78902",
    },
    {
      id: 8,
      type: "payment",
      title: "Payment Due Reminder",
      message: "Invoice INV-4568 for ₹38,500 is due in 2 days. Please schedule payment.",
      time: "4 days ago",
      read: true,
      priority: "warning",
      invoiceId: "INV-4568",
    },
  ]);

  const notificationTypes = [
    { id: "all", label: "All", icon: Bell },
    { id: "shipment", label: "Shipments", icon: Package },
    { id: "payment", label: "Payments", icon: CreditCard },
    { id: "contract", label: "Contracts", icon: FileText },
    { id: "approval", label: "Approvals", icon: CheckCircle },
    { id: "system", label: "System", icon: Settings },
  ];

  const filteredNotifications = filter === "all"
    ? notifications
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "shipment": return Package;
      case "payment": return CreditCard;
      case "contract": return FileText;
      case "delay": return AlertTriangle;
      case "approval": return CheckCircle;
      case "system": return Settings;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent": return "border-red-200 bg-red-50";
      case "warning": return "border-yellow-200 bg-yellow-50";
      case "success": return "border-green-200 bg-green-50";
      default: return "border-blue-200 bg-blue-50";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent": return AlertTriangle;
      case "warning": return Clock;
      case "success": return CheckCircle;
      default: return Bell;
    }
  };

  return (
    <div className="min-h-screen bg-[#ebeafb] flex flex-col lg:flex-row text-gray-800">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col w-full">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 max-w-5xl w-full mx-auto overflow-y-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Notifications</h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg sm:rounded-xl hover:bg-gray-50 flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Mark All Read</span>
                </button>
                <button
                  onClick={clearAll}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg sm:rounded-xl hover:bg-gray-50 flex items-center gap-2 text-xs sm:text-sm"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Notification Types Filter */}
            <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2">
              {notificationTypes.map((type) => {
                const Icon = type.icon;
                const count = type.id === "all"
                  ? notifications.length
                  : notifications.filter(n => n.type === type.id).length;
                
                return (
                  <button
                    key={type.id}
                    onClick={() => setFilter(type.id)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm ${
                      filter === type.id
                        ? "bg-[#211C84] text-white"
                        : "border hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{type.label}</span>
                    {count > 0 && (
                      <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                        filter === type.id
                          ? "bg-white text-[#211C84]"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 sm:py-12 border rounded-xl sm:rounded-2xl">
                  <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">No notifications</h3>
                  <p className="text-sm text-gray-600">You're all caught up!</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const PriorityIcon = getPriorityIcon(notification.priority);
                  
                  return (
                    <div
                      key={notification.id}
                      className={`border rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 transition-all ${
                        notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
                      } ${getPriorityColor(notification.priority)}`}
                    >
                      <div className="flex gap-2 sm:gap-3">
                        <div className={`p-1.5 sm:p-2 rounded-lg ${
                          notification.read ? 'bg-gray-100' : 'bg-blue-100'
                        }`}>
                          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            notification.read ? 'text-gray-600' : 'text-blue-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-1">
                                <h3 className="font-semibold text-sm sm:text-base">{notification.title}</h3>
                                <span className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-xs flex items-center gap-1 ${
                                  notification.priority === 'urgent'
                                    ? 'bg-red-100 text-red-700'
                                    : notification.priority === 'warning'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                  <PriorityIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                  <span>{notification.priority}</span>
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{notification.message}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                                <span>{notification.time}</span>
                                {notification.shipmentId && (
                                  <span className="flex items-center gap-1">
                                    <Package className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    {notification.shipmentId}
                                  </span>
                                )}
                                {notification.invoiceId && (
                                  <span className="flex items-center gap-1">
                                    <CreditCard className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    {notification.invoiceId}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 mt-1 sm:mt-0">
                              {!notification.read && (
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></span>
                              )}
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-0.5 sm:p-1 hover:bg-gray-100 rounded-lg"
                                title="Mark as read"
                              >
                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                              </button>
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-0.5 sm:p-1 hover:bg-gray-100 rounded-lg"
                                title="Delete"
                              >
                                <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                            {notification.shipmentId && (
                              <button className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm border rounded-lg hover:bg-gray-50">
                                Track Shipment
                              </button>
                            )}
                            {notification.invoiceId && (
                              <button className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm border rounded-lg hover:bg-gray-50">
                                View Invoice
                              </button>
                            )}
                            <button className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm text-blue-600 hover:text-blue-700">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Notification Settings */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 border rounded-lg sm:rounded-xl bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-2 sm:mb-3">
                <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  Notification Settings
                </h3>
                <button className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm border rounded-lg hover:bg-white">
                  Manage Settings
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <input type="checkbox" id="email-alerts" defaultChecked className="w-3 h-3 sm:w-4 sm:h-4" />
                  <label htmlFor="email-alerts">Email Alerts</label>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <input type="checkbox" id="push-alerts" defaultChecked className="w-3 h-3 sm:w-4 sm:h-4" />
                  <label htmlFor="push-alerts">Push Notifications</label>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <input type="checkbox" id="sms-alerts" className="w-3 h-3 sm:w-4 sm:h-4" />
                  <label htmlFor="sms-alerts">SMS Alerts (Urgent Only)</label>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}