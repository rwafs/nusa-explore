import React from "react";
import { FaThumbsUp, FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import Pantai_Kelingking from "../assets/Pantai_Kelingking.webp";
import Ulun_Danu from "../assets/Ulun_Danu.jpg";
import Prambanan from "../assets/Prambanan.jpg";

// Card Info Aplikasi
const infoCard = [
  {
    id: 1,
    title: "Informasi Akurat & Terverifikasi",
    description:
      "Dapatkan informasi wisata yang selalu up-to-date, akurat, dan terpercaya",
  },
  {
    id: 2,
    title: "Rekomendasi Berbasis AI",
    description:
      "Temukan destinasi terbaik sesuai preferensimu dengan bantuan AI cerdas",
  },
  {
    id: 3,
    title: "Ulasan Wisatawan yang Valid",
    description: "Lihat review jujur dari para turis yang sudah berkunjung",
  },
];

// Card Destinasi (static)
const infoDestinasi = [
  {
    id: 1,
    image: Pantai_Kelingking,
    name: "Pantai Kelingking",
    description:
      "Pantai ikonik dengan tebing curam berbentuk seperti jari kelingking dan air laut biru jernih.",
    location: "Nusa Penida, Bali",
  },
  {
    id: 2,
    image: Ulun_Danu,
    name: "Pura Ulun Danu",
    description:
      "Pura indah di tepi Danau Beratan yang dikelilingi kabut dan pegunungan sejuk di Bedugul.",
    location: "Bedugul, Bali",
  },
  {
    id: 3,
    image: Prambanan,
    name: "Candi Prambanan",
    description:
      "Kompleks candi Hindu terbesar di Indonesia dengan arsitektur megah dan kisah Ramayana.",
    location: "Yogyakarta, DI Yogyakarta",
  },
];

const Featured = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      {/* Card Info Aplikasi */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
        {infoCard.map((info) => (
          <div
            key={info.id}
            className="bg-white p-5 rounded-xl shadow-md flex items-start gap-4 w-full md:max-w-sm"
          >
            <div className="text-teal-600 text-2xl mt-1">
              <FaRegCheckCircle />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{info.title}</h4>
              <p className="text-sm text-gray-600">{info.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Judul Destinasi */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-teal-800 mb-10">
        Destinasi Unggulan
      </h2>

      {/* Card Info Destinasi */}
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {infoDestinasi.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-xl shadow-md overflow-hidden max-w-xs w-full"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-80 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-teal-600 font-semibold">
                <FaThumbsUp />
                <span>{dest.name}</span>
              </div>
              <p className="text-sm text-gray-600">{dest.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
