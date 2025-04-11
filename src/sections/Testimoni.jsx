import React from "react";
import "swiper/css";
import "swiper/css/autoplay";
import background from "../assets/6a3e74c52466652cd214532c28474016.png";
import { Autoplay } from "swiper/modules";
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
  {
    name: "Charles Muller",
    text: "Pengalaman yang cukup solid. Aplikasi ini membantu saya merencanakan perjalanan saya lebih cepat dari sebelumnya. Masih ada beberapa bug, tetapi tidak ada yang besar.",
    rating: 4,
  },
  {
    name: "Dicky Watkins",
    text: "Saya suka betapa intuitifnya aplikasi ini. Rekomendasinya sangat tepat, dan desainnya bersih serta mudah digunakan.",
    rating: 4,
  },
  {
    name: "Teresa Rose",
    text: "Sangat senang menggunakan NusaExplore! Saya menemukan air terjun yang indah yang tidak akan pernah saya temukan sendiri. 5/5!",
    rating: 5,
  },
];

const Testimoni = () => {
  return (
    <section
      className="p-8"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        loop={true}
        speed={3000}
        slidesPerView={3}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {dataTestimoni.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-4 rounded-xl shadow-md max-w-xs mx-auto">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <div className="flex text-yellow-500 text-xs">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimoni;
