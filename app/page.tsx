"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 relative overflow-hidden"> {/* Added relative and overflow-hidden for emoji positioning */}
      
      {/* Jumping Muscle Emojis */}
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

      <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg animate-fadeIn">
        Welcome to Your Fitness Tracker!
      </h1>
      <p className="text-xl text-gray-300 italic font-medium mb-8 max-w-2xl text-center leading-relaxed">
        Track your <span className="font-bold text-purple-500">workouts</span>,{" "}
        <span className="font-bold text-purple-500">meals</span>, and{" "}
        <span className="font-bold text-purple-500">progress</span>—all in one
        place. Your fitness journey starts here!
      </p>
      <div className="flex gap-4">
        <button
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
          onClick={() => router.push("/sign-up")}
        >
          Get Started
        </button>
        <button
          className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
    </div>
  );
}
