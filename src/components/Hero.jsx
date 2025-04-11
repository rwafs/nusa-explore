import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const HeroSection = () => {
  return (
    <section
      className="w-full h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: "url('/your-image-path.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
          NusaExplore
        </h1>
        <p className="text-white text-lg md:text-xl mb-8">
          Jelajahi keindahan Nusantara dengan rekomendasi cerdas dari
          NusaExplore. Temukan destinasi terbaik, dapatkan informasi akurat, dan
          nikmati perjalanan tanpa batas!
        </p>

        <div className="bg-white rounded-full p-2 flex items-center shadow-md max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Masukkan Destinasi"
            className="flex-grow px-4 py-2 rounded-l-full focus:outline-none"
          />
          <button className="text-white bg-teal-600 p-3 rounded-full hover:bg-teal-700">
            <FaSearch />
          </button>
          <div className="border-l mx-2 h-6"></div>
          <button className="flex items-center gap-1 text-gray-600 hover:text-black px-4">
            Kategori <IoIosArrowDown />
          </button>
        </div>
      </div>

      {/* Optional: Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[100px]"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: "#fff" }}
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
