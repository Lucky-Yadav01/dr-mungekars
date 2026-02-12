import React, { useState } from "react";
import drSiddhesh from "../../assets/drsiddhesh.png";
import drSunita from "../../assets/drsunita.png";
import { Link } from "react-router-dom";

const doctors = [
  {
    id: 1,
    name: "Dr. Siddhesh Mungekar",
    degree: "BDS",
    description:
      "With years of clinical experience, Dr. Siddhesh Mungekar is known for his calm approach and commitment to patient comfort. He focuses on preventive care, modern treatments, and long-term oral health solutions.",
    image: drSiddhesh,
  },
  {
    id: 2,
    name: "Dr. Sunita Mungekar",
    degree: "BDS",
    description:
      "Dr. Sunita Mungekar brings a patient-first philosophy with a gentle, compassionate approach to dentistry. She believes in clear communication, ethical treatment plans, and creating confident smiles.",
    image: drSunita,
  },
];

export default function AboutCardsSection() {
  const [index, setIndex] = useState(0);
  const doctor = doctors[index];

  const next = () => setIndex((prev) => (prev + 1) % doctors.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + doctors.length) % doctors.length);

  return (
    <section className="py-20 bg-[#F6F1E8]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Card */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* LEFT CONTENT */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-full border flex items-center justify-center font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-4xl font-serif font-semibold text-gray-900">
              {doctor.name}
            </h3>
            <p className="italic text-lg text-gray-600 mt-1">
              {doctor.degree}
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed max-w-lg">
              {doctor.description}
            </p>

            <div className="mt-8 flex items-center gap-6">
              <Link
                to="/about"
                className="bg-[#C9A24D] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
              >
                About Us
              </Link>

              {/* Slider arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  ❮
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  ❯
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
