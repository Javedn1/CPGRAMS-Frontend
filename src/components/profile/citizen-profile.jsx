"use client";
import {
  Camera,
  Phone,
  Mail,
  Edit,
  Calendar,
  CheckCircle,
  Menu,
  X,
  Header,
  VerticalProgressBar,
  Footer,
  PROGRESS_STEPS,
  PROFILE_DETAILS,
  useState,
  useRef,
  useEffect,
} from "../profile/ProfileConstants/profile-utils";

import { getTabs } from "../profile/ProfileConstants/navtabs";

export default function CitizenProfile() {
  const [profile, setProfile] = useState(PROFILE_DETAILS),
    [edit, setEdit] = useState(profile),
    [editing, setEditing] = useState(false),
    [tab, setTab] = useState("dashboard"),
    [aadhaarVisible, setAadhaarVisible] = useState(false),
    [passwordVisible, setPasswordVisible] = useState(false),
    [img, setImg] = useState(null),
    [showMenu, setShowMenu] = useState(false),
    fileRef = useRef(null);

  useEffect(() => {
    if (!editing) {
      const timer = setInterval(() => {
        setProfile((prev) => ({ ...prev, lastLogin: new Date() }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [editing]);

  const update = (field, val) => setEdit((prev) => ({ ...prev, [field]: val }));

  const tabs = getTabs({
    edit,
    update,
    editing,
    profile,
    aadhaarVisible,
    setAadhaarVisible,
    setPasswordVisible,
    passwordVisible,
  });

  const uploadImg = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result;
        setImg(url);
        editing
          ? setEdit((prev) => ({ ...prev, profileImage: url }))
          : setProfile((prev) => ({ ...prev, profileImage: url }));
      };
      reader.readAsDataURL(file);
    }
  };

  const save = () => {
    setProfile({ ...edit, lastLogin: new Date() });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300">
      <Header
        setTrackModalOpen={() => {}}
        handleAuthAction={() => {}}
        isLoggedIn
        handleLogout={() => {}}
      />
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <div className="hidden md:block">
          <VerticalProgressBar
            steps={PROGRESS_STEPS}
            activeStep={tab}
            setActiveStep={setTab}
            title={
              <span className="block mt-8 mb-[-30px] text-3xl font-bold">
                Profile Setup
              </span>
            }
            progressLineStyle={{ height: "550px", left: "48px" }}
          />
        </div>

        {!showMenu && (
          <div className="md:hidden fixed top-20 left-4 z-20">
            <button
              onClick={() => setShowMenu(true)}
              className="bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}
        {showMenu && (
          <>
            <button
              onClick={() => setShowMenu(false)}
              className="fixed top-4 right-4 z-30 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 md:hidden"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="md:hidden fixed inset-0 z-15 bg-black/30 backdrop-blur">
              <div className="fixed left-0 top-0 h-full w-[70vw] max-w-xs">
                <VerticalProgressBar
                  steps={PROGRESS_STEPS}
                  activeStep={tab}
                  setActiveStep={(t) => {
                    setTab(t);
                    setShowMenu(false);
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
          </>
        )}

        <div className="flex-1 p-4 md:p-8 lg:p-16 bg-white w-full">
          {/* profile header code below */}
          <div className="bg-white border-gray-200 rounded-lg shadow-sm border mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={
                        img ||
                        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                      }
                      alt="profile picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={uploadImg}
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
                      onClick={
                        editing
                          ? save
                          : () => {
                              setEdit(profile);
                              setEditing(true);
                            }
                      }
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {editing ? "Save Changes" : "Edit Profile"}
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
          {/*  nav tabs rendered here */}
          {tabs[tab]}
        </div>
      </div>
      <Footer />
    </div>
  );
}
