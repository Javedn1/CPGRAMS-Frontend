
import react,{ useState } from "react";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  User,
  Calendar,
  MapPin,
  Phone,
  ArrowLeft,
  Shield,
} from "lucide-react";
import HeaderLayout from "../../components/header/Header-Layout/HeaderLayout";
import Footer from "../../components/footer/footer";
const TrackGrievancePage = () => {
  const [activeTab, setActiveTab] = useState("grievance");
  const [trackingData, setTrackingData] = useState({ token: "", email: "" });
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (field, value) => {
    setTrackingData((prev) => ({ ...prev, [field]: value }));
  };
  const handleTrack = () => {
    setError("");
    if (!trackingData.token || !trackingData.email) {
      alert("Please enter all required fields.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (trackingData.token.toLowerCase() === "grv2024001234") {
        const mockComplaint = {
          token: trackingData.token,
          title: "Water Supply Issue in Sector 15",
          category: "Public Utilities",
          status: "In Progress",
          priority: "High",
          submissionDate: "2024-01-15",
          expectedResolution: "2024-01-25",
          assignedOfficer: "Mr. Rajesh Kumar",
          officerContact: "+91-9876543210",
          department: "Water Supply Department",
          location: "Sector 15, Block A",
          description:
            "Irregular water supply for two weeks. Severe inconvenience during peak hours.",
          timeline: [{
            date: "2024-01-15",
            time: "10:30 AM", 
            status: "Complaint Registered",
            description: "Complaint registered successfully.",
            icon:FileText,
            completed: true,
        },
        {
            date: "2024-01-16",
            time: "11:00 AM",
            status: "Assigned",
            description: "Complaint assigned to Mr. Rajesh Kumar.",
            icon:User,
            completed: true,
          
          
          },
          {
            date: "2024-01-18",
            time: "02:00 PM",
            status: "Resolved",
            description: "Site inspection completed by the assigned officer.",
            icon:CheckCircle,
            completed: true,
          },
          
        ],
          updates: [
            {
              date: "2024-01-20",
              message:
                "Pipeline blockage found at main junction. Repair work has been initiated.",
              type: "progress",
            },
            {
              date: "2024-01-20",
              message:
                "Pipeline blockage found at main junction. Repair work has been initiated.",
              type: "progress",
            },
          ],
        };

        setComplaint(mockComplaint);
      } else {
        setComplaint(null);
        setError("Invalid Token or No Grievance Found");
      }
      setIsLoading(false);
    }, 1500);
  };
  const handleReset = () => {
    setTrackingData({ token: "", email: "" });
    setComplaint(null);
    setError("");
  };

  return (
    <>
      <HeaderLayout />
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <div className="w-full md:w-56 bg-blue-800 text-white flex flex-col items-center py-8 md:py-10 relative">
          <button
            onClick={() => window.history.back()}
            className="absolute top-4 left-4 text-white hover:underline flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </button>
          <div className="mt-12 flex flex-col gap-4 w-full px-4">
            <button
              onClick={() => setActiveTab("grievance")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "grievance"
                  ? "bg-white text-blue-800 font-semibold "
                  : "hover:bg-blue-700"
              }`}
            >
              Track Grievance
            </button>
            <button
              onClick={() => setActiveTab("appeal")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "appeal"
                  ? "bg-white text-blue-800 font-semibold"
                  : "hover:bg-blue-700"
              }`}
            >
              Track Appeal
            </button>
          </div>
        </div>
        <div className="flex-1 p-4 md:p-8 bg-gradient-to-br from-blue-50 via-white to-slate-50 w-full">
          <div className="max-w-5xl mx-auto space-y-6 ">
            <h1 className="text-3xl font-bold mb-2">
              {activeTab === "grievance"
                ? "Track Your Grievance"
                : "Track Your Appeal"}
            </h1>
            <p className="text-gray-600 mb-6">
              Enter details to monitor the status of your {activeTab}.
            </p>

            <div className="bg-white shadow rounded p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                <Search className="w-5 h-5" /> Enter Tracking Details
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">
                    {activeTab === "grievance"
                      ? "Complaint Token Number"
                      : "Appeal Number"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      activeTab === "grievance"
                        ? "e.g., GRV2024001234"
                        : "e.g., APP2024005678"
                    }
                    value={trackingData.token}
                    onChange={(e) => handleInputChange("token", e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={trackingData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>

              <button
                onClick={handleTrack}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 flex justify-center items-center"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </div>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" /> Track{" "}
                    {activeTab === "grievance" ? "Grievance" : "Appeal"}
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded flex items-center gap-4">
                <Shield className="w-6 h-6 text-red-500" />
                <div>
                  <p className="font-semibold">{error}</p>
                  <p className="text-sm">
                    Please verify your{" "}
                    {activeTab === "grievance"
                      ? "token number"
                      : "appeal number"}{" "}
                    and email.
                  </p>
                </div>
              </div>
            )}

            {complaint && (
              <div className="border-2 border-blue-200 rounded-md p-6 space-y-4">
                <div className="bg-white shadow rounded p-6 space-y-4 animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {complaint.title}
                      </h2>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" /> Token:{" "}
                          <span className="font-mono">{complaint.token}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {complaint.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="px-2 py-1 text-xs rounded bg-blue-500 text-white">
                        {complaint.status}
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-red-500 text-white">
                        {complaint.priority} Priority
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{complaint.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Submitted</p>
                      <p className="font-medium">{complaint.submissionDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Expected Resolution
                      </p>
                      <p className="font-medium">
                        {complaint.expectedResolution}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-sm">{complaint.description}</p>
                  </div>
                </div>
                <div className="bg-white shadow rounded p-6 space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Assigned Officer
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Officer Name</p>
                      <p className="font-medium">{complaint.assignedOfficer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{complaint.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {complaint.officerContact}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded p-6 space-y-4">
                  {complaint.timeline.map((item,index)=>(
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${item.completed?"bg-primary text-primary-foreground border-primary":"bg-background border-border text-muted-foreground"}`}>
                        <item.icon className="w-5 h-5"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium ${item.completed?"text-foreground":"text-muted-foreground"}`}>{item.status}</h4>
                          <div className="text-xs text-muted-foreground text-right">
                            <div> {item.date}</div>
                            <div>{item.time}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground ">{item.description}</p>
                         </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white shadow rounded p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Recent Updates</h3>
                  {complaint.updates.map((update, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-gray-300 pl-4"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            update.type === "progress"
                              ? "bg-blue-100"
                              : "bg-gray-200"
                          }`}
                        >
                          {update.type === "progress"
                            ? "Progress Update"
                            : "Information"}
                        </span>
                        <span>{update.date}</span>
                      </div>
                      <p className="text-sm">{update.message}</p>
                    </div>
                  ))}
                </div>
                
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default TrackGrievancePage;
