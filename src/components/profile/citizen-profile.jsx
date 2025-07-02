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
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import Header from "../header/MainHeader";
import VerticalProgressBar from "./VerticalProgressBar";
import Footer from "../footer/Footer";

const PROGRESS_STEPS = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, number: 1 },
  { id: "personal", label: "Personal Details", icon: User, number: 2 },
  { id: "contact", label: "Contact Info", icon: Phone, number: 3 },
  { id: "address", label: "Address Details", icon: MapPin, number: 4 },
  { id: "identity", label: "Identity Verification", icon: Shield, number: 5 },
  { id: "account", label: "Account Settings", icon: Lock, number: 6 },
  { id: "documents", label: "Documents", icon: FileText, number: 7 },
];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const INITIAL_PROFILE = {
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
  state: "Delhi",
  pincode: "110001",
  aadhaar: "1234 5678 9012",
  voterId: "ABC1234567",
  pan: "ABCDE1234F",
  alternatePhone: "+91 8888888888",
  username: "johndoe123",
  registrationDate: "June 2025",
  password: "••••••••",
  profileImage: null,
};

const FormField = ({
  label,
  type = "text",
  placeholder,
  disabled,
  value,
  onChange,
  pattern,
  maxLength,
  rows,
  className = "",
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-900">{label}</label>
    {type === "textarea" ? (
      <textarea
        rows={rows || 3}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${className}`}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        pattern={pattern}
        maxLength={maxLength}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${className}`}
      />
    )}
  </div>
);

const SelectField = ({ label, disabled, value, onChange, children }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-900">{label}</label>
    <select
      disabled={disabled}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
    >
      {children}
    </select>
  </div>
);

const TabCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white border-gray-200 rounded-lg shadow-sm border">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <Icon className="w-5 h-5" />
        {title}
      </h2>
    </div>
    <div className="p-6 space-y-6">{children}</div>
  </div>
);

// Main Component
function CitizenProfile() {
  // Add this state at the top with other useState declarations
  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [editProfile, setEditProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false);
  const fileInputRef = useRef(null);

  // Real-time last login update
  useEffect(() => {
    if (!isEditing) {
      const timer = setInterval(() => {
        setProfile((prev) => ({ ...prev, lastLogin: new Date() }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isEditing]);

  const handleEdit = () => {
    setEditProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...editProfile, lastLogin: new Date() });
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        setProfileImage(imageUrl);
        // Also update the profile state to persist the image
        if (isEditing) {
          setEditProfile((prev) => ({ ...prev, profileImage: imageUrl }));
        } else {
          setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = (field, value) => {
    setEditProfile((prev) => ({ ...prev, [field]: value }));
  };

  const renderTabContent = () => {
    const currentData = isEditing ? editProfile : profile;

    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="bg-white border-gray-200 rounded-lg shadow-sm border p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to Your Profile Dashboard
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Manage your personal information, contact details, and account
                  settings all in one place.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: User,
                      color: "blue",
                      title: "Personal Info",
                      desc: "Update your basic information",
                    },
                    {
                      icon: Phone,
                      color: "green",
                      title: "Contact Details",
                      desc: "Manage your contact information",
                    },
                    {
                      icon: Lock,
                      color: "purple",
                      title: "Account Security",
                      desc: "Secure your account settings",
                    },
                  ].map(({ icon: Icon, color, title, desc }, i) => (
                    <div key={i} className="text-center">
                      <div
                        className={`w-16 h-16 bg-${color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}
                      >
                        <Icon className={`w-8 h-8 text-${color}-600`} />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {title}
                      </h4>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "personal":
        return (
          <TabCard title="Personal Information" icon={User}>
            <div className="grid grid-cols-1 py-3 md:grid-cols-2 gap-6">
              <FormField
                label="Full Name"
                placeholder="eg. John Jane Doe"
                disabled={!isEditing}
                value={currentData.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <SelectField
                label="Gender"
                disabled={!isEditing}
                value={currentData.gender}
                onChange={(e) => updateField("gender", e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </SelectField>
              <FormField
                label="Date of Birth"
                type="date"
                disabled={!isEditing}
                value={currentData.dob}
                onChange={(e) => updateField("dob", e.target.value)}
              />
              <FormField
                label="Nationality"
                placeholder="Indian"
                disabled={!isEditing}
                value={currentData.nationality}
                onChange={(e) => updateField("nationality", e.target.value)}
              />
            </div>
          </TabCard>
        );

      case "contact":
        return (
          <TabCard title="Contact Information" icon={Phone}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Primary Mobile Number"
                type="tel"
                pattern="^\+91 ?[6-9]\d{9}$"
                maxLength={14}
                placeholder="eg. +91 9999999999"
                disabled={!isEditing}
                value={currentData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              <FormField
                label="Alternate Phone"
                type="tel"
                pattern="^\+91 ?[6-9]\d{9}$"
                maxLength={14}
                placeholder="eg. +91 8888888888"
                disabled={!isEditing}
                value={currentData.alternatePhone}
                onChange={(e) => updateField("alternatePhone", e.target.value)}
              />
              <FormField
                label="Email Address"
                type="email"
                placeholder="eg. xyz@gmail.com"
                disabled={!isEditing}
                className="md:col-span-2"
                value={currentData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>
          </TabCard>
        );

      case "address":
        return (
          <TabCard title="Address Details" icon={MapPin}>
            <FormField
              label="Full Address"
              type="textarea"
              rows={3}
              placeholder="eg. 123, MG Road, Sector 15, Near City Mall"
              disabled={!isEditing}
              value={currentData.address}
              onChange={(e) => updateField("address", e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="City"
                placeholder="eg. New Delhi"
                disabled={!isEditing}
                value={currentData.city}
                onChange={(e) => updateField("city", e.target.value)}
              />
              <FormField
                label="District"
                placeholder="eg. Central Delhi"
                disabled={!isEditing}
                value={currentData.district}
                onChange={(e) => updateField("district", e.target.value)}
              />
              <SelectField
                label="State"
                disabled={!isEditing}
                value={currentData.state}
                onChange={(e) => updateField("state", e.target.value)}
              >
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </SelectField>
              <FormField
                label="Pincode"
                placeholder="eg. 110001"
                pattern="^\d{6}$"
                disabled={!isEditing}
                value={currentData.pincode}
                onChange={(e) => updateField("pincode", e.target.value)}
              />
            </div>
          </TabCard>
        );

      case "identity":
        return (
          <TabCard title="Identity Verification" icon={Shield}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Aadhaar Number
                </label>
                <div className="relative">
                  <input
                    type={showAadhaar ? "text" : "password"}
                    value={currentData.aadhaar}
                    onChange={(e) => updateField("aadhaar", e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
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
              <FormField
                label="Voter ID"
                placeholder="eg. ABC1234567"
                disabled={!isEditing}
                value={currentData.voterId}
                onChange={(e) => updateField("voterId", e.target.value)}
              />
              <FormField
                label="PAN Number"
                placeholder="eg. ABCDE1234F"
                disabled={!isEditing}
                value={currentData.pan}
                onChange={(e) => updateField("pan", e.target.value)}
              />
            </div>
            <FormField
              label="Change Password"
              placeholder={INITIAL_PROFILE.password}
              disabled={!isEditing}
              value={currentData.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
            <button
              className="mt-0 inline-flex items-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              type="button"
              disabled={!isEditing}
            >
              Change Password
            </button>
          </TabCard>
        );

      case "account":
        return (
          <TabCard title="Account Details" icon={Lock}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Username"
                placeholder="eg. johndoe123"
                disabled
                value={profile.username}
              />
              <FormField
                label="Registration Date"
                value={profile.registrationDate}
                disabled
                className="bg-gray-50 text-gray-500"
              />
              <FormField
                label="Last Login"
                value={profile.lastLogin.toLocaleString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                disabled
                className="bg-gray-50 text-gray-500"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
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
          </TabCard>
        );

      case "documents":
        return (
          <TabCard title="Uploaded Documents" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h3 className="font-medium text-gray-900">
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
                          <span className="text-sm text-gray-900">{doc}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 cursor-pointer hover:text-blue-800 text-sm">
                            View
                          </button>
                          <button className="text-green-600 cursor-pointer hover:text-green-800 text-sm">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300">
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
            steps={PROGRESS_STEPS}
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

        {/* Mobile Menu Button */}
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

        {/* Mobile Close Button */}
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
          <div className="md:hidden fixed inset-0 z-15 bg-black/30 backdrop-blur">
            <div className="fixed left-0 top-0 h-full w-[70vw] max-w-xs">
              <VerticalProgressBar
                steps={PROGRESS_STEPS}
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
          {/* Profile Header - Now uses dynamic profile state */}
          <div className="bg-white border-gray-200 rounded-lg shadow-sm border mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={
                        profileImage ||
                        profile.profileImage ||
                        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
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
                    <h1 className="text-3xl font-bold text-gray-900">
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
                  <div className="mt-2 text-sm text-gray-600">
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

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CitizenProfile;
