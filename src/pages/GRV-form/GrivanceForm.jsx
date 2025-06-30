import { useState } from "react";
//import Header from "../../components/header/header";
import HeaderLayout from "../../components/header/Header-Layout/HeaderLayout";
import Footer from "../../components/footer/footer";

export default function GrievanceForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    grievanceTitle: "",
    grievanceDescription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <>
        <HeaderLayout/>
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar with Progress */}
      <div className="w-full md:w-64 bg-blue-800 text-white flex flex-col items-center py-8 md:py-10 relative">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-14 text-center">
          Grievance Form
        </h2>
        {/* Vertical Progress */}
        <div className="relative flex flex-col items-start space-y-12 md:space-y-20 w-full px-4 md:pl-8">
          {/* Progress Line */}
          <div className="absolute top-0 bottom-0 left-8 md:left-12 w-1 z-0 flex flex-col justify-between h-40 md:h-60">
            {/* Line from 1 to 2 */}
            <div
              className={`flex-1 ${
                step > 1 ? "bg-green-500" : "bg-green-200"
              } transition-all duration-300`}
            ></div>
            {/* Line from 2 to 3 */}
            <div
              className={`flex-1 ${
                step > 2 ? "bg-green-500" : "bg-green-200"
              } transition-all duration-300`}
            ></div>
          </div>
          <StepCircle
            label="Personal Details"
            active={step === 1}
            completed={step > 1}
            number={1}
          />
          <StepCircle
            label="Grievance Details"
            active={step === 2}
            completed={step > 2}
            number={2}
          />
          <StepCircle
            label="Review & Submit"
            active={step === 3}
            completed={false}
            number={3}
          />
        </div>
      </div>
      {/* Form Content */}
      <div className="flex-1 p-4 md:p-8 lg:p-16 bg-white w-full">
        {step === 1 && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Personal Details
            </h2>
            <div className="space-y-4">
              <InputField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {/* formData.email} onChange={handleChange} /> */}
              <InputField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <InputField
                label="Address Line 1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
              <div className="flex flex-col md:flex-row md:space-x-4">
                <InputField
                  label="Address Line 2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                />
                {/* formData.city} onChange={handleChange} /> */}
              </div>
              <InputField
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6 flex flex-col md:flex-row justify-end gap-2 md:gap-4">
              <button
                onClick={nextStep}
                className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Grievance Details
            </h2>
            <div className="space-y-4">
              <InputField
                label="Grievance Title"
                name="grievanceTitle"
                value={formData.grievanceTitle}
                onChange={handleChange}
              />
              <div>
                <label className="block text-sm font-medium mb-1">
                  Grievance Description
                </label>
                <textarea
                  name="grievanceDescription"
                  value={formData.grievanceDescription}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm md:text-base"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row justify-between gap-2 md:gap-4">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-4 md:px-6 py-2 rounded hover:bg-gray-400 transition w-full md:w-auto"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Review & Submit
            </h2>
            <div className="space-y-4">
              <ReviewItem label="Full Name" value={formData.fullName} />
              {/* formData.email} /> */}
              <ReviewItem label="Phone Number" value={formData.phone} />
              <ReviewItem label="Address Line 1" value={formData.address1} />
              <ReviewItem label="Address Line 2" value={formData.address2} />
              {/* formData.city} /> */}
              <ReviewItem label="Postal Code" value={formData.postalCode} />
              <ReviewItem
                label="Grievance Title"
                value={formData.grievanceTitle}
              />
              <ReviewItem
                label="Grievance Description"
                value={formData.grievanceDescription}
              />
            </div>
            <div className="mt-6 flex flex-col md:flex-row justify-between gap-2 md:gap-4">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-4 md:px-6 py-2 rounded hover:bg-gray-400 transition w-full md:w-auto"
              >
                Back
              </button>
              <button className="bg-green-600 text-white px-4 md:px-6 py-2 rounded hover:bg-green-700 transition w-full md:w-auto">
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

// Step Progress Circle
const StepCircle = ({ label, active, number, completed }) => (
  <div className="relative flex items-center z-10">
    <div
      className={`z-20 w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300
        ${
          completed
            ? "bg-green-500 border-green-500 text-white shadow-lg"
            : active
            ? "bg-blue-600 border-blue-600 text-white shadow"
            : "bg-gray-200 border-gray-300 text-gray-400"
        }
      `}
    >
      {completed ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        number
      )}
    </div>
    <span
      className={`ml-4 text-base font-medium whitespace-nowrap ${
        active ? "text-white" : "text-blue-200"
      }`}
    >
      {label}
    </span>
  </div>
);

// Input Field Reusable
const InputField = ({ label, name, value, onChange }) => (
  <div className="flex-1 mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md p-2"
    />
  </div>
);

// Review Field Display
const ReviewItem = ({ label, value }) => (
  <div className="border-b border-gray-200 py-2">
    <strong>{label}:</strong> <span className="ml-2">{value || "-"}</span>
  </div>
);
