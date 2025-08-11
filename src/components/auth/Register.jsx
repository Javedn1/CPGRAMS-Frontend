import { useState } from "react";
import { showToast } from "../../utils/customToast";
import { baseUrl } from "../../utils/ApiConstants";
 
export default function MultiStepRegister({ onRegisterSuccess }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
 
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    district: "",
    pincode: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityCode: "",
  });
 
  const [captcha, setCaptcha] = useState(generateCaptcha());
 
  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
 
  const validateStep = (currentStep) => {
    let newErrors = {};
    let requiredFields = [];
 
    if (currentStep === 1) {
      requiredFields = ["fullName", "gender"];
    } else if (currentStep === 2) {
      requiredFields = ["address", "city", "state", "district", "pincode"];
    } else if (currentStep === 3) {
      requiredFields = ["phoneNumber", "email", "password", "confirmPassword", "securityCode"];
    }
 
    requiredFields.forEach((field) => {
      if (!registerForm[field]?.trim()) {
        newErrors[field] = true;
      }
    });
 
    setErrors(newErrors);
 
    if (Object.keys(newErrors).length > 0) {
      showToast("Please fill all required fields.", "error");
      return false;
    }
    return true;
  };
 
  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };
 
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
 
  const handleRegister = async () => {
    if (!validateStep(3)) return;
 
    if (registerForm.securityCode !== captcha) {
      showToast("Incorrect Security Code. Please try again.", "error");
      return;
    }
 
    if (registerForm.password !== registerForm.confirmPassword) {
      showToast("Passwords do not match. Please try again.", "error");
      return;
    }
 
    setIsSubmitting(true);
 
    try {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
 
      const data = await response.json();
 
      if (response.ok) {
        setTimeout(() => {
          showToast("Registration Successful! Welcome email has been sent.", "success");
          setIsSubmitting(false);
          if (onRegisterSuccess) onRegisterSuccess();
        }, 1000);
      } else {
        showToast(`Registration failed: ${data.message || "Unknown error"}`, "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      showToast("Registration failed. Please try again.", "error");
      setIsSubmitting(false);
    }
  };
 
  const getInputClass = (field) =>
    `w-full border rounded px-3 py-2 ${errors[field] ? "border-red-500" : "border-gray-300"}`;
 
  return (
    <div className="w-full max-w-xl mx-auto p-6 border border-gray-200 shadow-lg rounded-lg space-y-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Citizen Registration</h2>
 
      {/* Step Indicators */}
      <div className="flex justify-center space-x-4 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              step === s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
 
      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              className={getInputClass("fullName")}
              value={registerForm.fullName}
              onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender *</label>
            <div className="flex space-x-4 mt-1">
              {["Male", "Female", "Transgender"].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={registerForm.gender === option}
                    onChange={(e) => setRegisterForm({ ...registerForm, gender: e.target.value })}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-red-500 text-sm">Please select a gender.</p>}
          </div>
 
          <div className="flex justify-end">
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Next
            </button>
          </div>
        </div>
      )}
 
      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-4">
          {["address", "city", "state", "district", "pincode"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field} *
              </label>
              <input
                className={getInputClass(field)}
                value={registerForm[field]}
                onChange={(e) => setRegisterForm({ ...registerForm, [field]: e.target.value })}
              />
            </div>
          ))}
 
          <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Back
            </button>
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Next
            </button>
          </div>
        </div>
      )}
 
      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-4">
          {["phoneNumber", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field} *
              </label>
              <input
                type={field.includes("password") ? "password" : "text"}
                className={getInputClass(field)}
                value={registerForm[field]}
                onChange={(e) => setRegisterForm({ ...registerForm, [field]: e.target.value })}
              />
            </div>
          ))}
 
          {/* Security Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Security Code *</label>
            <div className="flex items-center space-x-4 mt-1">
              <input
                className={getInputClass("securityCode")}
                placeholder="Enter the code"
                value={registerForm.securityCode}
                onChange={(e) => setRegisterForm({ ...registerForm, securityCode: e.target.value })}
              />
              <div className="px-3 py-2 bg-gray-100 rounded text-gray-700 font-bold min-w-[80px] text-center">
                {captcha}
              </div>
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setCaptcha(generateCaptcha())}
              >
                Refresh
              </button>
            </div>
          </div>
 
          <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Back
            </button>
            <button
              onClick={handleRegister}
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}