"use client";  // Mark the file as a Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // For redirection after logout

export default function TrainingPage() {
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [weight, setWeight] = useState(70); // Default weight value
  const [height, setHeight] = useState(170); // Default height value
  const [distance, setDistance] = useState(0);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [heartRate, setHeartRate] = useState(75); // Default heart rate value
  const [workoutType, setWorkoutType] = useState('Running'); // Default workout type
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const router = useRouter();  // Hook for redirection

  // Function to handle logout
  const handleLogout = () => {
    // Clear authentication data (e.g., localStorage, sessionStorage)
    localStorage.removeItem('authToken');  // Example, if you're using localStorage for auth
    sessionStorage.removeItem('authToken'); // If using sessionStorage
    
    // Redirect to the login page
    router.push('/login');  // Assuming the login page is at '/login'
  };

  // Function to start the workout timer
  const startWorkout = () => {
    setIsActive(true);
    const id = setInterval(() => {
      setWorkoutTime((prevTime) => prevTime + 1);
      setCaloriesBurned((prevCalories) => prevCalories + 0.1);
      setDistance((prevDistance) => prevDistance + 0.01);
      setHeartRate((prevHeartRate) => prevHeartRate + 1); // Simulate increase in heart rate
    }, 1000);
    setIntervalId(id);
  };

  // Function to stop the workout timer
  const stopWorkout = () => {
    setIsActive(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  // Function to reset all stats
  const resetAllStats = () => {
    setCaloriesBurned(0);
    setWorkoutTime(0);
    setDistance(0);
    setWeight(70); // Reset to default
    setHeight(170); // Reset to default
    setHeartRate(75); // Reset heart rate
    setWorkoutType('Running'); // Reset workout type
  };

  // Render the page
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-400 to-indigo-300 p-6 flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-white mb-6">Health & Fitness Tracker</h1>
      
      {/* First Section with Input Fields */}
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 h-full">
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-green-600">Enter Your Details</h2>
          </div>

          <div className="flex flex-col space-y-4 mb-6">
            <label className="text-lg font-semibold text-gray-800">
              Weight (kg)
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="mt-2 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </label>

            <label className="text-lg font-semibold text-gray-800">
              Height (cm)
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="mt-2 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </label>

            <label className="text-lg font-semibold text-gray-800">
              Heart Rate (bpm)
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className="mt-2 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </label>

            <label className="text-lg font-semibold text-gray-800">
              Workout Type
              <select
                value={workoutType}
                onChange={(e) => setWorkoutType(e.target.value)}
                className="mt-2 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Walking">Walking</option>
              </select>
            </label>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={startWorkout}
              disabled={isActive}
              className="bg-green-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-green-700 transition-all duration-300 ease-in-out"
            >
              Start Workout
            </button>
            <button
              onClick={stopWorkout}
              disabled={!isActive}
              className="bg-red-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out"
            >
              Stop Workout
            </button>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={resetAllStats}
              className="bg-red-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out"
            >
              Reset All Stats
            </button>
          </div>
        </div>
      </div>

      {/* Second Section for Workout Stats */}
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 h-full">
        <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-3">Workout Summary</h2>
          <div className="text-lg mb-3">
            <strong>Calories Burned:</strong> {caloriesBurned.toFixed(2)} kcal
          </div>
          <div className="text-lg mb-3">
            <strong>Distance:</strong> {distance} km
          </div>
          <div className="text-lg mb-3">
            <strong>Weight:</strong> {weight} kg
          </div>
          <div className="text-lg mb-3">
            <strong>Height:</strong> {height} cm
          </div>
          <div className="text-lg mb-3">
            <strong>Heart Rate:</strong> {heartRate} bpm
          </div>
          <div className="text-lg mb-3">
            <strong>Workout Type:</strong> {workoutType}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out mt-8"
      >
        Logout
      </button>
    </div>
  );
}