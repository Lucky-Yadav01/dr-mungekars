// import useUnsplashImages from "../../hooks/useUnsplashImages";

// /* Icons (SVG – lightweight, scalable, professional) */
// function ExperienceIcon({ type }) {
//   const base = "w-10 h-10 text-[#C5A049]";
//   if (type === "care")
//     return (
//       <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//         <path d="M12 21s-6-4.35-9-8.5A5.4 5.4 0 0112 5a5.4 5.4 0 019 7.5C18 16.65 12 21 12 21z" />
//       </svg>
//     );

//   if (type === "finance")
//     return (
//       <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//         <path d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z" />
//         <path d="M9 12h6" />
//       </svg>
//     );

//   return (
//     <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//       <path d="M12 3v18" />
//       <path d="M3 12h18" />
//     </svg>
//   );
// }

// export default function ExperienceAndTestimonials() {
//   /* Unsplash images */
//   const { images } = useUnsplashImages("dental clinic team smiling", 3);

//   const experience = [
//     {
//       title: "Personalized Care",
//       desc:
//         "We take time to understand your health, goals, and comfort. Dentistry built around you.",
//       icon: "care",
//     },
//     {
//       title: "Financial Clarity",
//       desc:
//         "Transparent pricing, insurance guidance, and honest conversations—no surprises.",
//       icon: "finance",
//     },
//     {
//       title: "Comfort Add-Ons",
//       desc:
//         "Warm lighting, calm spaces, and gentle care designed to reduce anxiety.",
//       icon: "comfort",
//     },
//   ];

//   return (
//     <section className="bg-[#f6f3ee] py-20">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* ================= EXPERIENCE ================= */}
//         <div className="text-center max-w-3xl mx-auto">
//           <p className="text-xs tracking-widest uppercase text-gray-500">
//             Dentistry Done Differently
//           </p>

//           <h2 className="mt-3 text-4xl md:text-5xl font-serif text-gray-900">
//             The Experience
//           </h2>
//         </div>

//         <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-12">
//           {experience.map((item, i) => (
//             <div
//               key={i}
//               className="text-center px-6"
//             >
//               <div className="flex justify-center mb-4">
//                 <ExperienceIcon type={item.icon} />
//               </div>

//               <h3 className="text-xl font-semibold mb-3">
//                 {item.title}
//               </h3>

//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* ================= DIVIDER ================= */}
//         <div className="my-20 h-px bg-gray-300/60 max-w-4xl mx-auto" />

//         {/* ================= TESTIMONIALS ================= */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

//           {/* LEFT – IMAGE */}
//           <div className="rounded-xl overflow-hidden shadow-lg">
//             <img
//               src={images?.[0]?.urls?.regular}
//               alt="Dental team"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* RIGHT – TEXT */}
//           <div className="space-y-6">
//             <h3 className="text-3xl md:text-4xl font-serif">
//               Word of Mouth
//             </h3>

//             <p className="italic text-gray-700">
//               “This clinic truly listens. The care feels calm, thoughtful,
//               and never rushed.”
//             </p>

//             <p className="italic text-gray-700">
//               “Everything was explained clearly. I finally feel confident
//               about my dental health.”
//             </p>

//             <p className="italic text-gray-700">
//               “The environment is warm and welcoming—nothing like a
//               traditional clinic.”
//             </p>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

import useUnsplashImages from "../../hooks/useUnsplashImages";

/* ---------- Experience Icons (SVG) ---------- */
function Icon({ type }) {
  const cls = "w-10 h-10 text-[#C5A049]";
  if (type === "care")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21s-6-4.35-9-8.5A5.4 5.4 0 0112 5a5.4 5.4 0 019 7.5C18 16.65 12 21 12 21z" />
      </svg>
    );
  if (type === "finance")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z" />
      </svg>
    );
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v18" />
      <path d="M3 12h18" />
    </svg>
  );
}

export default function Testimonials() {
  /* Unsplash image */
  const { images } = useUnsplashImages("dental clinic team smiling", 1);

  const experience = [
    {
      title: "Personalized Care",
      desc:
        "We take time to understand your health, goals, and comfort. Care that’s thoughtful and patient-first.",
      icon: "care",
    },
    {
      title: "Financial Clarity",
      desc:
        "Upfront pricing, insurance guidance, and honest conversations. No surprises.",
      icon: "finance",
    },
    {
      title: "Comfort Add-Ons",
      desc:
        "Warm lighting, calming spaces, and gentle care designed to reduce anxiety.",
      icon: "comfort",
    },
  ];

  /* Real reviews (manually curated – industry standard) */
  const reviews = [
    {
      text:
        "Love this place and the aesthetic! Dr. Mungekar is a perfectionist. I always feel taken care of by the entire staff.",
      author: "Heather N.",
    },
    {
      text:
        "Wonderful clinic and dentist. They go the extra mile to explain everything clearly and make you feel comfortable.",
      author: "Rebecca N.",
    },
    {
      text:
        "I’ve never had such a calm dental experience. The team is kind, patient, and extremely professional.",
      author: "Gina",
    },
    {
      text:
        "The whole team is amazing. They are so welcoming and genuinely care about their patients.",
      author: "Adriana P.",
    },
  ];

  return (
    <section className="bg-[#f6f3ee] py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* ================= EXPERIENCE ================= */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500">
            Dentistry Done Differently
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif text-gray-900">
            The Experience
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-12">
          {experience.map((item, i) => (
            <div
              key={i}
              className="text-center px-6"
            >
              <div className="flex justify-center mb-4">
                <Icon type={item.icon} />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="my-20 h-px bg-gray-300/60 max-w-4xl mx-auto" />

        {/* ================= WORD OF MOUTH ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* IMAGE */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={images?.[0]?.urls?.regular}
              alt="Dental clinic team"
              className="w-full h-full object-cover"
            />
          </div>

          {/* REVIEWS */}
          <div>
            <h3 className="text-3xl md:text-4xl font-serif mb-8">
              Word of Mouth
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {reviews.map((r, i) => (
                <div key={i}>
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    “{r.text}”
                  </p>
                  <p className="mt-3 text-xs font-semibold text-gray-900">
                    — {r.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
