"use client";

import React, { useState } from 'react';

export default function FitnessPlan() {
  const [weight, setWeight] = useState<number>(70); // Default weight value
  const [height, setHeight] = useState<number>(170); // Default height value
  const [workoutPlan, setWorkoutPlan] = useState<string>('');
  const [pushups, setPushups] = useState<number>(0);
  const [situps, setSitups] = useState<number>(0);
  const [squats, setSquats] = useState<number>(0);
  const [burpees, setBurpees] = useState<number>(0);
  const [lunges, setLunges] = useState<number>(0);
  const [plank, setPlank] = useState<number>(0);

  // Calculate BMI to determine the workout plan
  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi;
  };

  // Calculate estimated calories burned for each exercise
  const calculateCalories = (exercise: string, reps: number) => {
    const caloriesPerRep = {
      pushups: 0.36,  // Calories burned per push-up
      situps: 0.2,    // Calories burned per sit-up
      squats: 0.3,    // Calories burned per squat
      burpees: 0.6,   // Calories burned per burpee
      lunges: 0.25,   // Calories burned per lunge
      plank: 0.5      // Calories burned per minute of plank
    };

    if (exercise === "plank") {
      return caloriesPerRep[exercise] * (plank / 60); // Convert plank time to minutes
    } else {
      return caloriesPerRep[exercise] * reps;
    }
  };

  // Calculate total calories burned
  const calculateTotalCalories = () => {
    return (
      calculateCalories("pushups", pushups) +
      calculateCalories("situps", situps) +
      calculateCalories("squats", squats) +
      calculateCalories("burpees", burpees) +
      calculateCalories("lunges", lunges) +
      calculateCalories("plank", plank)
    ).toFixed(2);
  };

  const handleGeneratePlan = () => {
    const bmi = calculateBMI(weight, height);

    let plan = '';
    let recommendedPushups = 0;
    let recommendedSitups = 0;
    let recommendedSquats = 0;
    let recommendedBurpees = 0;
    let recommendedLunges = 0;
    let recommendedPlank = 0;

    if (bmi < 18.5) {
      // Underweight: Focus on gaining muscle mass
      plan = 'You are underweight. Focus on strength training (weight lifting, resistance exercises) to build muscle mass. Ensure you are consuming a calorie surplus for muscle gain.';
      recommendedPushups = 10;
      recommendedSitups = 15;
      recommendedSquats = 15;
      recommendedBurpees = 5;
      recommendedLunges = 10;
      recommendedPlank = 30; // seconds
    } else if (bmi >= 18.5 && bmi < 24.9) {
      // Normal weight: Focus on maintaining and general fitness
      plan = 'You have a normal BMI. Maintain a balanced routine that includes both strength training and cardiovascular exercises to keep fit. Activities like running, cycling, and swimming will be beneficial.';
      recommendedPushups = 20;
      recommendedSitups = 30;
      recommendedSquats = 30;
      recommendedBurpees = 15;
      recommendedLunges = 20;
      recommendedPlank = 45; // seconds
    } else if (bmi >= 25 && bmi < 29.9) {
      // Overweight: Focus on fat loss
      plan = 'You are overweight. Focus on cardiovascular exercises (running, cycling, swimming) to burn fat. Combine with strength training for muscle preservation and fat loss.';
      recommendedPushups = 15;
      recommendedSitups = 25;
      recommendedSquats = 25;
      recommendedBurpees = 10;
      recommendedLunges = 15;
      recommendedPlank = 30; // seconds
    } else {
      // Obese: Focus on fat loss and improving cardiovascular health
      plan = 'You are in the obese category. Focus on a combination of cardiovascular exercises (running, walking, cycling) to lose weight. Strength training will help preserve muscle mass. Consider consulting a nutritionist for a personalized plan.';
      recommendedPushups = 10;
      recommendedSitups = 20;
      recommendedSquats = 20;
      recommendedBurpees = 5;
      recommendedLunges = 10;
      recommendedPlank = 20; // seconds
    }

    setWorkoutPlan(plan);
    setPushups(recommendedPushups);
    setSitups(recommendedSitups);
    setSquats(recommendedSquats);
    setBurpees(recommendedBurpees);
    setLunges(recommendedLunges);
    setPlank(recommendedPlank);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-center text-purple-300 mb-6">Fitness Plan Generator</h1>

      {/* Input Section */}
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 h-full">
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-green-600">Enter Your Details</h2>
          </div>

          <div className="flex flex-col space-y-4 mb-6">
            <label className="text-lg font-semibold text-gray-300">
              Weight (kg)
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="mt-2 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900"
              />
            </label>

            <label className="text-lg font-semibold text-gray-300">
              Height (cm)
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="mt-2 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900"
              />
            </label>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={handleGeneratePlan}
              className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Generate Workout Plan
            </button>
          </div>
        </div>
      </div>

      {/* Workout Plan Output Section */}
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 h-full">
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-3">Suggested Workout Plan</h2>
          <p className="text-lg text-gray-300 mb-4">{workoutPlan}</p>

          <div className="text-lg text-gray-300">
            <strong>Recommended Push-ups:</strong> {pushups} reps
          </div>
          <div className="text-lg text-gray-300">
            <strong>Recommended Sit-ups:</strong> {situps} reps
          </div>
          <div className="text-lg text-gray-300">
            <strong>Recommended Squats:</strong> {squats} reps
          </div>
          <div className="text-lg text-gray-300">
            <strong>Recommended Burpees:</strong> {burpees} reps
          </div>
          <div className="text-lg text-gray-300">
            <strong>Recommended Lunges:</strong> {lunges} reps
          </div>
          <div className="text-lg text-gray-300">
            <strong>Recommended Plank Time:</strong> {plank} seconds
          </div>

          {/* Total Calories Burned */}
          <div className="mt-6 text-2xl font-semibold text-green-600">
            <strong>Total Calories Burned:</strong> {calculateTotalCalories()} kcal
          </div>
        </div>
      </div>

      {/* Exercise Image Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Push-ups Box */}
        <div className="bg-gray-800 p-12 rounded-xl shadow-xl flex flex-col items-center">
          <img
            src="https://www.inspireusafoundation.org/wp-content/uploads/2021/08/diamond-pushup.gif"
            alt="Push-ups"
            className="w-full h-90 object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-semibold text-green-600">Push-ups</h3>
          <p className="text-lg text-gray-300">Push-ups target the chest and arms. Aim for {pushups} reps.</p>
          <p className="text-lg text-gray-300">Calories burned: {calculateCalories("pushups", pushups)} kcal</p>
        </div>

        {/* Sit-ups Box */}
        <div className="bg-gray-800 p-12 rounded-xl shadow-xl flex flex-col items-center">
          <img
            src="https://www.inspireusafoundation.org/wp-content/uploads/2023/08/crunch-floor.gif"
            alt="Sit-ups"
            className="w-full h-90 object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-semibold text-green-600">Sit-ups</h3>
          <p className="text-lg text-gray-300">Sit-ups work the core muscles. Aim for {situps} reps.</p>
          <p className="text-lg text-gray-300">Calories burned: {calculateCalories("situps", situps)} kcal</p>
        </div>

        {/* Squats Box */}
        <div className="bg-gray-800 p-12 rounded-xl shadow-xl flex flex-col items-center">
          <img
            src="https://homeworkouts.org/wp-content/uploads/anim-air-squat.gif"
            alt="Squats"
            className="w-full h-90 object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-semibold text-green-600">Squats</h3>
          <p className="text-lg text-gray-300">Squats target your legs and glutes. Aim for {squats} reps.</p>
          <p className="text-lg text-gray-300">Calories burned: {calculateCalories("squats", squats)} kcal</p>
        </div>

        {/* Burpees Box */}
        <div className="bg-gray-800 p-12 rounded-xl shadow-xl flex flex-col items-center">
          <img
            src="https://www.inspireusafoundation.org/wp-content/uploads/2022/01/burpee-movement.gif"
            alt="Burpees"
            className="w-full h-90 object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-semibold text-green-600">Burpees</h3>
          <p className="text-lg text-gray-300">Burpees are great for full-body conditioning. Aim for {burpees} reps.</p>
          <p className="text-lg text-gray-300">Calories burned: {calculateCalories("burpees", burpees)} kcal</p>
        </div>

        {/* Lunges Box */}
        <div className="bg-gray-800 p-12 rounded-xl shadow-xl flex flex-col items-center">
          <img
            src="https://www.inspireusafoundation.org/wp-content/uploads/2023/07/bodyweight-forward-lunge.gif"
            alt="Lunges"
            className="w-full h-90 object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-semibold text-green-600">Lunges</h3>
          <p className="text-lg text-gray-300">Lunges are excellent for targeting the lower body. Aim for {lunges} reps.</p>
          <p className="text-lg text-gray-300">Calories burned: {calculateCalories("lunges", lunges)} kcal</p>
        </div>

        {/* Plank Box */}
        <div className="bg-gray-800 p-12 rounded-xl shadow-xl flex flex-col items-center">
          <img
            src="https://www.inspireusafoundation.org/wp-content/uploads/2022/01/plank-movement.gif"
            alt="Plank"
            className="w-full h-90 object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-semibold text-green-600">Plank</h3>
          <p className="text-lg text-gray-300">The plank strengthens the core. Hold for {plank} seconds.</p>
          <p className="text-lg text-gray-300">Calories burned: {calculateCalories("plank", plank)} kcal</p>
        </div>
        <div className="mt-6 text-center">
          <a
            href="/food-mixer"  // Replace this URL with the correct one
            className="inline-block bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-400 transition duration-300"
          >
            Check out your food plan on the food mixer!
          </a>
        </div>


      </div>
    </div>

  );
}
