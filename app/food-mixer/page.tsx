"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const foodData = [
  { id: 1, food: "Chicken Breast (100g)", calories: 165, type: "Protein" },
  { id: 2, food: "Broccoli (100g)", calories: 34, type: "Vegetable" },
  { id: 3, food: "Brown Rice (100g)", calories: 111, type: "Carb" },
  { id: 4, food: "Almonds (28g)", calories: 164, type: "Fat" },
  { id: 5, food: "Avocado (100g)", calories: 160, type: "Fat" },
  { id: 6, food: "Sweet Potato (100g)", calories: 86, type: "Carb" },
  { id: 7, food: "Salmon (100g)", calories: 206, type: "Protein" },
  { id: 8, food: "Apple (100g)", calories: 52, type: "Fruit" },
  { id: 9, food: "Spinach (100g)", calories: 23, type: "Vegetable" },
  { id: 10, food: "Egg (1 large)", calories: 72, type: "Protein" },
  { id: 11, food: "Oats (100g)", calories: 389, type: "Carb" },
  { id: 12, food: "Greek Yogurt (100g)", calories: 59, type: "Protein" },
  { id: 13, food: "Banana (100g)", calories: 89, type: "Fruit" },
  { id: 14, food: "Cucumber (100g)", calories: 16, type: "Vegetable" },
  { id: 15, food: "Peanut Butter (28g)", calories: 190, type: "Fat" },
  { id: 16, food: "Cottage Cheese (100g)", calories: 98, type: "Protein" },
  { id: 17, food: "Carrot (100g)", calories: 41, type: "Vegetable" },
  { id: 18, food: "Chia Seeds (28g)", calories: 137, type: "Fat" },
  { id: 19, food: "Tomato (100g)", calories: 18, type: "Vegetable" },
  { id: 20, food: "Tuna (100g)", calories: 132, type: "Protein" },
];

export default function FoodMixerPage() {
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
  const router = useRouter();

  const handleAddFood = (food: typeof foodData[0]) => {
    const existingFoodIndex = selectedFoods.findIndex((item) => item.id === food.id);

    if (existingFoodIndex >= 0) {
      const updatedFoods = [...selectedFoods];
      updatedFoods[existingFoodIndex].quantity += 100;
      setSelectedFoods(updatedFoods);
    } else {
      setSelectedFoods([...selectedFoods, { ...food, quantity: 100 }]);
    }
  };

  const handleRemoveFood = (id: number) => {
    setSelectedFoods(selectedFoods.filter((food) => food.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const updatedFoods = selectedFoods.map((food) =>
      food.id === id ? { ...food, quantity: newQuantity } : food
    );
    setSelectedFoods(updatedFoods);
  };

  const totalCalories = selectedFoods.reduce(
    (total, food) => total + (food.calories * (food.quantity / 100)),
    0
  );

  const navigateToTraining = () => {
    router.push("/training");
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-extrabold text-center text-purple-300 mb-6">
        Mix Your Foods and Calculate Calories
      </h1>
      <p className="text-center text-lg text-gray-400 mb-8">
        Select foods to mix and see how many calories you'll consume!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {foodData.map((food) => (
          <div
            key={food.id}
            className="bg-gray-700 p-4 rounded-lg shadow-lg hover:bg-gray-600 transition-all"
          >
            <h3 className="text-2xl font-semibold text-purple-400">{food.food}</h3>
            <p className="text-lg text-gray-300">Calories: {food.calories} kcal per 100g</p>
            <p className="text-sm text-gray-400">{food.type}</p>
            <button
              className="w-full py-2 bg-purple-500 text-white rounded-lg mt-4 hover:bg-purple-600 transition"
              onClick={() => handleAddFood(food)}
            >
              Add 100g
            </button>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-purple-300 text-center mb-4">
          Your Food Mix:
        </h2>
        <div className="space-y-4">
          {selectedFoods.map((food) => (
            <div
              key={food.id}
              className="bg-gray-700 p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-purple-400">{food.food}</h3>
                <p className="text-sm text-gray-300">Current Quantity: {food.quantity}g</p>
                <p className="text-sm text-gray-400">{food.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={food.quantity}
                  onChange={(e) =>
                    handleQuantityChange(food.id, Number(e.target.value))
                  }
                  className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg"
                />
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => handleRemoveFood(food.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-lg text-white">
        <h3 className="font-bold text-purple-300">Total Calories: {totalCalories.toFixed(2)} kcal</h3>
      </div>

      <div className="mt-8">
        <button
          onClick={navigateToTraining}
          className="bg-green-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out"
        >
          Go to Training Page
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-red-600 transition-all duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
