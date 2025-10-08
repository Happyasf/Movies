import React from "react";

export const MovieCard = ({ title, image, rating }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
      {/* Kép teljesen látszik, jó minőségben */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-80 object-cover"
      />

      {/* Cím és rating overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 flex justify-between items-end text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="bg-yellow-500 text-black text-sm font-bold px-2 py-1 rounded-lg">
          ⭐ {rating}
        </span>
      </div>
    </div>
  );
};