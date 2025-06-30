import { useState } from "react";
 
export default function MultiStepRegister() {
  const [step, setStep] = useState(1);
 
  const [registerForm, setRegisterForm] = useState({
    name: "",
    gender: "",
    address: "",
    locality: "",
    state: "",
    district: "",
    pincode: "",
    phone: "",
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
 
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
 
  const handleRegister = () => {
    if (registerForm.securityCode !== captcha) {
      alert("Incorrect Security Code. Please try again.");
      return;
    }
    console.log("Registration Data:", registerForm);
    alert("Registration Successful!");
  };
 
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
 
      {/* Step 1 - Personal Info */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
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
          </div>
 
          <div className="flex justify-end space-x-2">
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Next
            </button>
          </div>
        </div>
      )}
 
      {/* Step 2 - Contact Details */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address / Premises</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={registerForm.address}
              onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700">Locality</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={registerForm.locality}
              onChange={(e) => setRegisterForm({ ...registerForm, locality: e.target.value })}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={registerForm.state}
              onChange={(e) => setRegisterForm({ ...registerForm, state: e.target.value })}
            >
              <option value="">-- Select State --</option>
              <option value="Delhi">Delhi</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Other">Other</option>
            </select>
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700">District</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={registerForm.district}
              onChange={(e) => setRegisterForm({ ...registerForm, district: e.target.value })}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={registerForm.pincode}
              onChange={(e) => setRegisterForm({ ...registerForm, pincode: e.target.value })}
            />
          </div>
 
          <div className="flex justify-between space-x-2">
            <button onClick={prevStep} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Back
            </button>
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Next
            </button>
          </div>
        </div>
      )}
 
      {/* Step 3 - Account Setup */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={registerForm.phone}
              onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
            />
          </div>
 
          {/* Security Code with Refresh */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Security Code</label>
            <div className="flex items-center space-x-4 mt-1">
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
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
 
          <div className="flex justify-between space-x-2">
            <button onClick={prevStep} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Back
            </button>
            <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}