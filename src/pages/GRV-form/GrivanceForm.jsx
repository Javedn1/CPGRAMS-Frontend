import { useState } from "react";
import HeaderLayout from "../../components/header/Header-Layout/HeaderLayout";
import Footer from "../../components/footer/footer";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";


export default function GrievanceForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    district: "",
    postalCode: "",
    grievanceTitle: "",
    grievanceCategory: "",
    grievanceDepartment: "",
    grievanceLocation: "",
    grievanceDate: "",
    grievancePriority: "",
    grievanceRelief: "",
    grievanceDescription: "",
    grievanceAttachment: null,
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Store File object
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };


  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  //generate pdf
  const generatePDF = (formData) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Grievance Submission Summary", 20, 20);

    const fields = Object.entries(formData);
    let y = 30;

    fields.forEach(([key, value]) => {
      if (key === "declaration") return;
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      doc.setFontSize(12);
      doc.text(`${label}: ${value || "-"}`, 20, y);
      y += 8;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("grievance-summary.pdf");
  };

  return (
    <>
      <HeaderLayout />
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <div className="w-full md:w-64 bg-blue-800 text-white flex flex-col items-center py-10 relative">
          <h2 className="text-3xl font-bold mb-12 text-center">Grievance Form</h2>
          <div className="relative flex flex-col items-start space-y-20 w-full px-4 md:pl-8">
            <div className="absolute top-0 bottom-0 left-12 w-1 z-0 flex flex-col justify-between h-60">
              <div className={`flex-1 ${step > 1 ? "bg-green-500" : "bg-gray-400"}`}></div>
              <div className={`flex-1 ${step > 2 ? "bg-green-500" : "bg-gray-400"}`}></div>
            </div>
            <StepCircle label="Personal Details" active={step === 1} completed={step > 1} number={1} />
            <StepCircle label="Grievance Details" active={step === 2} completed={step > 2} number={2} />
            <StepCircle label="Review & Submit" active={step === 3} completed={false} number={3} />
          </div>
        </div>

        <div className="flex-1 p-8 lg:p-16 bg-gradient-to-br from-blue-50 via-white to-slate-50 w-full">
          {step === 1 && (
            <div className="border-2 border-dashed shadow-lg rounded-md border-gray-300 p-4">
              <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
              <div className="space-y-4">
                <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
                <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />
                <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-1 mb-4">
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <InputField label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />
                </div>
                <InputField label="Address Line 1" name="address1" value={formData.address1} onChange={handleChange} />
                <InputField label="Address Line 2" name="address2" value={formData.address2} onChange={handleChange} />
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
                  <InputField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
                  <InputField label="District" name="district" value={formData.district} onChange={handleChange} />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={nextStep} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="border-2 border-dashed shadow-lg rounded-md border-gray-300 p-4">
              <h2 className="text-2xl font-bold mb-6">Grievance Details</h2>
              <div className="space-y-4">
                <InputField label="Grievance Title" name="grievanceTitle" value={formData.grievanceTitle} onChange={handleChange} />
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <InputField label="Category" name="grievanceCategory" value={formData.grievanceCategory} onChange={handleChange} />
                  <InputField label="Department" name="grievanceDepartment" value={formData.grievanceDepartment} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Attach Supporting Document</label>
                  <input
                    type="file"
                    name="grievanceAttachment"
                    accept=".pdf,.jpg,.png,.jpeg,.docx"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  />
                  {formData.grievanceAttachment && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected File: <strong>{formData.grievanceAttachment.name}</strong>
                    </p>
                  )}
                </div>

                <InputField label="Location of Issue" name="grievanceLocation" value={formData.grievanceLocation} onChange={handleChange} />
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <InputField label="Date of Incident" name="grievanceDate" value={formData.grievanceDate} onChange={handleChange} type="date" />
                  <div className="flex-1 mb-4">
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <select name="grievancePriority" value={formData.grievancePriority} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
                      <option value="">Select</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                <InputField label="Relief Expected" name="grievanceRelief" value={formData.grievanceRelief} onChange={handleChange} />
                <div>
                  <label className="block text-sm font-medium mb-1">Grievance Description</label>
                  <textarea name="grievanceDescription" value={formData.grievanceDescription} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 text-sm md:text-base" />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={prevStep} className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400 transition">
                  Back
                </button>
                <button onClick={nextStep} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="border-2 border-dashed shadow-xl rounded-xl border-gray-300 p-6 bg-white">
              <h2 className="text-3xl font-bold mb-6 text-blue-700">Review Your Details</h2>

              {/* Personal Info */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-1 border-gray-200">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <ReviewItem label="Full Name" value={formData.fullName} />
                  <ReviewItem label="Email" value={formData.email} />
                  <ReviewItem label="Phone Number" value={formData.phone} />
                  <ReviewItem label="Gender" value={formData.gender} />
                  <ReviewItem label="Date of Birth" value={formData.dob} />
                  <ReviewItem label="Address Line 1" value={formData.address1} />
                  <ReviewItem label="Address Line 2" value={formData.address2} />
                  <ReviewItem label="City" value={formData.city} />
                  <ReviewItem label="State" value={formData.state} />
                  <ReviewItem label="District" value={formData.district} />
                  <ReviewItem label="Postal Code" value={formData.postalCode} />
                </div>
              </div>

              {/* Grievance Info */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-1 border-gray-200">Grievance Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <ReviewItem label="Title" value={formData.grievanceTitle} />
                  <ReviewItem label="Category" value={formData.grievanceCategory} />
                  <ReviewItem label="Department" value={formData.grievanceDepartment} />
                  <ReviewItem
                    label="Attached File"
                    value={formData.grievanceAttachment ? formData.grievanceAttachment.name : "No file attached"}
                  />
                  <ReviewItem label="Location" value={formData.grievanceLocation} />
                  <ReviewItem label="Incident Date" value={formData.grievanceDate} />
                  <ReviewItem label="Priority" value={formData.grievancePriority} />
                  <ReviewItem label="Expected Relief" value={formData.grievanceRelief} />
                  <ReviewItem label="Description" value={formData.grievanceDescription} />
                </div>
              </div>

              {/* Declaration */}
              <div className="flex items-start mt-4 bg-gray-100 p-3 rounded-md border border-gray-300">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                />
                <label className="text-sm text-gray-700">
                  I confirm that the above information is true and accurate to the best of my knowledge.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
                <button
                  onClick={prevStep}
                  className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400 text-gray-800 transition w-full md:w-auto"
                >
                  Back
                </button>
                <button
                  disabled={!formData.declaration}
                  className={`${formData.declaration
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-300 cursor-not-allowed"
                    } text-white px-6 py-2 rounded transition w-full md:w-auto`}
                  onClick={() => {
                    const grievanceId = "GRV-" + Date.now(); // You can replace this with real backend-generated ID
                    generatePDF(formData);
                    alert("Grievance Submitted! Your PDF has been downloaded.");
                    navigate("/grievance-success", { state: { grievanceId } });
                  }}
                >
                  Submit
                </button>

              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}

// Step Progress Circle
const StepCircle = ({ label, active, number, completed }) => (
  <div className="relative flex items-center z-10">
    <div className={`z-20 w-8 h-8 flex items-center justify-center rounded-full border-2 ${completed ? "bg-green-500 border-green-500 text-white" : active ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-200 border-gray-300 text-gray-400"}`}>
      {completed ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : number}
    </div>
    <span className={`ml-4 text-base font-medium ${active ? "text-white" : "text-blue-200"}`}>{label}</span>
  </div>
);

// Input Field
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex-1 mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} className="w-full border border-gray-300 rounded-md p-2" />
  </div>
);

// Review Field
const ReviewItem = ({ label, value }) => (
  <div className="border-b border-gray-200 py-2">
    <strong>{label}:</strong> <span className="ml-2">{value || "-"}</span>
  </div>
);
