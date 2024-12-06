"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Link from "next/link"; // Import Link from Next.js

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
  });
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [completion, setCompletion] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate form completion progress
  useEffect(() => {
    const filledFields = Object.values(formData).filter((val) => val !== "").length;
    setCompletion((filledFields / Object.keys(formData).length) * 100);
  }, [formData]);

  // Update form data and password strength
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    if (password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password)) {
      return "Strong";
    } else if (password.length >= 6) {
      return "Medium";
    }
    return "Weak";
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "An error occurred.");
    } else {
      setError("");
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        window.location.href = "/login";
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {showConfetti && <Confetti />}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, index) => (
          <span
            key={index}
            className="absolute text-4xl opacity-60 animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            💪
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-xl bg-gray-800 p-8 rounded-3xl shadow-lg space-y-8 relative z-10">
        <h1 className="text-5xl font-extrabold text-center text-purple-300 mb-6">
          Welcome to Our Fitness App!
        </h1>
        <p className="text-lg text-center text-gray-400 mb-8">
          Create an account to start your fitness journey! 🏃‍♀️💪
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-6 relative">
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
            <label htmlFor="fullName" className="absolute text-sm left-4 -top-4 text-gray-300">
              Full Name
            </label>
          </div>

          {/* Email Address */}
          <div className="mb-6 relative">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
            <label htmlFor="email" className="absolute text-sm left-4 -top-4 text-gray-300">
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
            <label htmlFor="password" className="absolute text-sm left-4 -top-4 text-gray-300">
              Password
            </label>
            <div className="mt-1">
              <span
                className={`text-sm ${
                  passwordStrength === "Strong"
                    ? "text-green-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                Password Strength: {passwordStrength || "Enter Password"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
            <label htmlFor="confirmPassword" className="absolute text-sm left-4 -top-4 text-gray-300">
              Confirm Password
            </label>
          </div>

          {/* Date of Birth */}
          <div className="mb-6 relative">
            <input
              type="date"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
            <label htmlFor="dateOfBirth" className="absolute text-sm left-4 -top-4 text-gray-300">
              Date of Birth
            </label>
          </div>

          {/* Gender */}
          <div className="mb-6 relative">
            <select
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="gender" className="absolute text-sm left-4 -top-4 text-gray-300">
              Gender
            </label>
          </div>

          {/* Nationality */}
          <div className="mb-6 relative">
            <input
              type="text"
              id="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
            <label htmlFor="nationality" className="absolute text-sm left-4 -top-4 text-gray-300">
              Nationality
            </label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            Register
          </button>
        </form>

        {/* Link to Login Page */}
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
