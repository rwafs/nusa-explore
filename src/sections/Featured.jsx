import React from "react";
import { FaThumbsUp, FaRegCheckCircle } from "react-icons/fa";
import Pantai_Kelingking from "../assets/Pantai_Kelingking.webp";
import Ulun_Danu from "../assets/Ulun_Danu.jpg";
import Prambanan from "../assets/Prambanan.jpg";

// Data Info Aplikasi
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

// Data Destinasi
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
    location: "Prambanan, DI Yogyakarta",
  },
];

const Featured = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Info Card Section */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
        {infoCard.map((info) => (
          <div
            key={info.id}
            className="bg-white p-5 rounded-xl shadow-md flex items-start gap-4 w-full md:max-w-sm"
          >
            <div className="text-teal-600 text-2xl">
              <FaRegCheckCircle />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                {info.title}
              </h4>
              <p className="text-sm text-gray-600">{info.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Judul Section */}
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-teal-800 mb-10">
        Destinasi Unggulan
      </h2>

      {/* Destinasi Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {infoDestinasi.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xs"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-64 object-cover"
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
