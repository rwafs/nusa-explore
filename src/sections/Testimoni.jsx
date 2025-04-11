import React from "react";
import background from "../assets/testimoni_bckground.png";
import { FaEllipsisH, FaStar } from "react-icons/fa";

const dataTestimoni = [
  {
    name: "John Doe",
    text: "NusaExplore benar-benar mengubah cara saya bepergian. Semuanya begitu mulus dan mudah dinavigasi. Sangat direkomendasikan!",
    rating: 5,
  },
  {
    name: "Jack Smith",
    text: "Interface yang bagus, banyak tempat tersembunyi yang tidak pernah saya ketahui. Bisa menggunakan beberapa filter lagi, tetapi secara keseluruhan sangat membantu!",
    rating: 4,
  },
  {
    name: "Anastasia Rohm",
    text: "Awalnya saya skeptis, tetapi aplikasi ini melebihi ekspektasi saya. Menemukan liburan akhir pekan yang sempurna berkat saran dari AI!",
    rating: 5,
  },
  // Bisa tambahkan lebih banyak, tapi kita pakai 3 teratas aja
];

const Testimoni = () => {
  return (
    <section
      className="py-16 px-6 md:px-12"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "120%",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-8 text-center">
          Apa Kata Mereka?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dataTestimoni.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <div className="flex text-gray-900 text-xs">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <FaEllipsisH className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimoni;
