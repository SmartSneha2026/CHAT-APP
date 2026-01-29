import React from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="flex lg:flex items-center justify-center p-12 bg-gray-50">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`w-20 h-20 rounded-2xl bg-blue-500/40 
                ${i % 2 === 0 ? "animate-pulse" : ""}`}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
        <p className="text-gray-700">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
