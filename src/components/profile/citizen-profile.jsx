"use client";

import { useState, useRef, useEffect } from "react";
import {
  User,
  MapPin,
  Shield,
  FileText,
  Camera,
  Phone,
  Mail,
  Edit,
  Eye,
  EyeOff,
  Lock,
  Calendar,
  CheckCircle,
  Upload,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import Header from "../header/MainHeader";
import VerticalProgressBar from "./VerticalProgressBar";
import Footer from "../footer/Footer";

function CitizenProfile({ profileImage, setProfileImage }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Define steps for the progress bar
  const progressSteps = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, number: 1 },
    { id: "personal", label: "Personal Details", icon: User, number: 2 },
    { id: "contact", label: "Contact Info", icon: Phone, number: 3 },
    { id: "address", label: "Address Details", icon: MapPin, number: 4 },
    { id: "identity", label: "Identity Verification", icon: Shield, number: 5 },
    { id: "account", label: "Account Settings", icon: Lock, number: 6 },
    { id: "documents", label: "Documents", icon: FileText, number: 7 },
  ];

  // Centralized profile state
  const [profile, setProfile] = useState({
    name: "John J. Doe",
    email: "johndoe@gmail.com",
    phone: "+91 9999999999",
    memberSince: "June 2025",
    lastLogin: new Date(),
    accountStatus: "Active",
    nationality: "Indian",
    gender: "male",
    dob: "1995-06-15",
    address: "123, MG Road, Sector 15, Near City Mall",
    city: "New Delhi",
    district: "Central Delhi",
    state: "delhi",
    pincode: "110001",
    aadhaar: "1234 5678 9012",
    voterId: "ABC1234567",
    pan: "ABCDE1234F",
    alternatePhone: "+91 8888888888",
    username: "johndoe123",
    registrationDate: "June 2025",
    password: "••••••••",
  });

  const [editProfile, setEditProfile] = useState(profile);

  // Real-time last login update
  useEffect(() => {
    if (!isEditing) {
      const timer = setInterval(() => {
        setProfile((prev) => ({ ...prev, lastLogin: new Date() }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isEditing]);

  // When entering edit mode, copy profile to editProfile
  const handleEdit = () => {
    setEditProfile(profile);
    setIsEditing(true);
  };

  // Save changes
  const handleSave = () => {
    setProfile({
      ...editProfile,
      lastLogin: new Date(),
    });
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const themeClass = "bg-gray-50";
  const cardClass = "bg-white border-gray-200";
  const textClass = "text-gray-900";
  const mutedTextClass = "text-gray-600";

  return (
    <div
      className={`min-h-screen ${themeClass} transition-colors duration-300`}
    >
      <Header
        setTrackModalOpen={() => {}}
        handleAuthAction={() => {}}
        isLoggedIn={true}
        handleLogout={() => {}}
      />

      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        {/* Desktop Vertical Progress Bar */}
        <div className="hidden md:block">
          <VerticalProgressBar
            steps={progressSteps}
            activeStep={activeTab}
            setActiveStep={setActiveTab}
            title={
              <span className="block mt-8 mb-[-30px] text-3xl font-bold">
                Profile Setup
              </span>
            }
            progressLineStyle={{ height: "550px", left: "48px" }}
          />
        </div>

        {/* Mobile Menu Button (only when menu is closed) */}
        {!isMobileMenuOpen && (
          <div className="md:hidden fixed top-20 left-4 z-20">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* X (close) button at top right when menu is open */}
        {isMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed top-4 right-4 z-30 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-15 bg-white/10 backdrop-blur">
            <div className="fixed left-0 top-0 h-full w-[70vw] max-w-xs">
              <VerticalProgressBar
                steps={progressSteps.filter((step) => step.id !== "finish")}
                activeStep={activeTab}
                setActiveStep={(step) => {
                  setActiveTab(step);
                  setIsMobileMenuOpen(false);
                }}
                title={
                  <span className="text-3xl font-bold">Profile Setup</span>
                }
                className="fixed bottom-0 rounded-lg left-1 right-0 h-full px-7 py-4 flex flex-col gap-y-10 md:static md:h-full"
                progressLineClassName="!bottom-32"
                progressLineStyle={{ height: "410px", left: "30px" }}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 lg:p-16 bg-white w-full">
          {/* Profile Header */}
          <div className={`${cardClass} rounded-lg shadow-sm border mb-8`}>
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={
                        profileImage ||
                        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt="profile picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <h1 className={`text-3xl font-bold ${textClass}`}>
                      {profile.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    </div>
                    <button
                      onClick={isEditing ? handleSave : handleEdit}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Member since: {profile.memberSince}</span>
                    </div>
                  </div>
                  <div className={`mt-2 text-sm ${mutedTextClass}`}>
                    Last login:{" "}
                    {profile.lastLogin.toLocaleString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    • Account Status: {profile.accountStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className={`${cardClass} rounded-lg shadow-sm border p-6`}>
                <div className="text-center">
                  <h3 className={`text-2xl font-bold ${textClass} mb-4`}>
                    Welcome to Your Profile Dashboard
                  </h3>
                  <p className={`text-lg ${mutedTextClass} mb-6`}>
                    Manage your personal information, contact details, and
                    account settings all in one place.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className={`font-semibold ${textClass} mb-2`}>
                        Personal Info
                      </h4>
                      <p className={`text-sm ${mutedTextClass}`}>
                        Update your basic information
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Phone className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className={`font-semibold ${textClass} mb-2`}>
                        Contact Details
                      </h4>
                      <p className={`text-sm ${mutedTextClass}`}>
                        Manage your contact information
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lock className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className={`font-semibold ${textClass} mb-2`}>
                        Account Security
                      </h4>
                      <p className={`text-sm ${mutedTextClass}`}>
                        Secure your account settings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          {activeTab === "personal" && (
            <div className={`${cardClass} rounded-lg shadow-sm border`}>
              <div className="p-6 border-b border-gray-200">
                <h2
                  className={`text-xl font-semibold ${textClass} flex items-center gap-2`}
                >
                  <User className="w-5 h-5" />
                  Personal Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 py-3 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="eg. John Jane Doe"
                      value={isEditing ? editProfile.name : profile.name}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          name: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Gender
                    </label>
                    <select
                      value={isEditing ? editProfile.gender : profile.gender}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          gender: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={isEditing ? editProfile.dob : profile.dob}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          dob: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Nationality
                    </label>
                    <input
                      type="text"
                      placeholder="Indian"
                      value={
                        isEditing
                          ? editProfile.nationality
                          : profile.nationality
                      }
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          nationality: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {activeTab === "contact" && (
            <div className={`${cardClass} rounded-lg shadow-sm border`}>
              <div className="p-6 border-b border-gray-200">
                <h2
                  className={`text-xl font-semibold ${textClass} flex items-center gap-2`}
                >
                  <Phone className="w-5 h-5" />
                  Contact Information
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Primary Mobile Number
                    </label>
                    <input
                      type="tel"
                      pattern="^\+91 ?[6-9]\d{9}$"
                      maxLength={14}
                      value={isEditing ? editProfile.phone : profile.phone}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^\d+]/g, "");
                        if (/^\+91 ?[6-9]?\d{0,9}$/.test(v)) {
                          setEditProfile({ ...editProfile, phone: v });
                        }
                      }}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Alternate Phone
                    </label>
                    <input
                      type="tel"
                      pattern="^\+91 ?[6-9]\d{9}$"
                      maxLength={14}
                      value={
                        isEditing
                          ? editProfile.alternatePhone
                          : profile.alternatePhone
                      }
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^\d+]/g, "");
                        if (/^\+91 ?[6-9]?\d{0,9}$/.test(v)) {
                          setEditProfile({ ...editProfile, alternatePhone: v });
                        }
                      }}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="eg. xyz@gmail.com"
                      value={isEditing ? editProfile.email : profile.email}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          email: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Address Details */}
          {activeTab === "address" && (
            <div className={`${cardClass} rounded-lg shadow-sm border`}>
              <div className="p-6 border-b border-gray-200">
                <h2
                  className={`text-xl font-semibold ${textClass} flex items-center gap-2`}
                >
                  <MapPin className="w-5 h-5" />
                  Address Details
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${textClass}`}>
                    Full Address
                  </label>
                  <textarea
                    rows={3}
                    value={isEditing ? editProfile.address : profile.address}
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        address: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      City
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editProfile.city : profile.city}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, city: e.target.value })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      District
                    </label>
                    <input
                      type="text"
                      value={
                        isEditing ? editProfile.district : profile.district
                      }
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          district: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      State
                    </label>
                    <select
                      value={isEditing ? editProfile.state : profile.state}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          state: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    >
                      <option value="delhi">Delhi</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="tamil-nadu">Tamil Nadu</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editProfile.pincode : profile.pincode}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          pincode: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Identity Verification */}
          {activeTab === "identity" && (
            <div className={`${cardClass} rounded-lg shadow-sm border`}>
              <div className="p-6 border-b border-gray-200">
                <h2
                  className={`text-xl font-semibold ${textClass} flex items-center gap-2`}
                >
                  <Shield className="w-5 h-5" />
                  Identity Verification
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Aadhaar Number
                    </label>
                    <div className="relative">
                      <input
                        type={showAadhaar ? "text" : "password"}
                        value={
                          isEditing ? editProfile.aadhaar : profile.aadhaar
                        }
                        onChange={(e) =>
                          setEditProfile({
                            ...editProfile,
                            aadhaar: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowAadhaar(!showAadhaar)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showAadhaar ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Voter ID
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editProfile.voterId : profile.voterId}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          voterId: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      PAN Number
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editProfile.pan : profile.pan}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, pan: e.target.value })
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Aadhaar Upload
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className={`text-xs ${mutedTextClass} mb-2`}>
                        Upload Aadhaar Card
                      </p>
                      <button className="cursor-pointer px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Choose File
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Voter ID Upload
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className={`text-xs ${mutedTextClass} mb-2`}>
                        Upload Voter ID
                      </p>
                      <button className="cursor-pointer px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Choose File
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      PAN Upload
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className={`text-xs ${mutedTextClass} mb-2`}>
                        Upload PAN Card
                      </p>
                      <button className="cursor-pointer px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Details */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <div className={`${cardClass} rounded-lg shadow-sm border`}>
                <div className="p-6 border-b border-gray-200">
                  <h2
                    className={`text-xl font-semibold ${textClass} flex items-center gap-2`}
                  >
                    <Lock className="w-5 h-5" />
                    Account Details
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        className={`block text-sm font-medium ${textClass}`}
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        value={
                          isEditing ? editProfile.username : profile.username
                        }
                        onChange={(e) =>
                          setEditProfile({
                            ...editProfile,
                            username: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className={`block text-sm font-medium ${textClass}`}
                      >
                        Registration Date
                      </label>
                      <input
                        type="text"
                        value={
                          isEditing
                            ? editProfile.registrationDate
                            : profile.registrationDate
                        }
                        disabled
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className={`block text-sm font-medium ${textClass}`}
                      >
                        Last Login
                      </label>
                      <input
                        type="text"
                        value={profile.lastLogin.toLocaleString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        disabled
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className={`block text-sm font-medium ${textClass}`}
                      >
                        Account Status
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {profile.accountStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Password Section */}
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${textClass}`}>
                      Password
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={profile.password}
                        disabled
                        className={`flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500`}
                      />
                      <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {activeTab === "documents" && (
            <div className={`${cardClass} rounded-lg shadow-sm border`}>
              <div className="p-6 border-b border-gray-200">
                <h2
                  className={`text-xl font-semibold ${textClass} flex items-center gap-2`}
                >
                  <FileText className="w-5 h-5" />
                  Uploaded Documents
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Document categories */}
                  {[
                    {
                      title: "Identity Proofs",
                      docs: ["Aadhaar Card", "Voter ID", "PAN Card"],
                    },
                    {
                      title: "Address Proofs",
                      docs: ["Utility Bill", "Bank Statement"],
                    },
                  ].map((category, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className={`font-medium ${textClass}`}>
                        {category.title}
                      </h3>
                      <div className="space-y-3">
                        {category.docs.map((doc, docIndex) => (
                          <div
                            key={docIndex}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <span className={`text-sm ${textClass}`}>
                                {doc}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                View
                              </button>
                              <button className="text-green-600 hover:text-green-800 text-sm">
                                Download
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CitizenProfile;
