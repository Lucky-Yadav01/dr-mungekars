import React from "react";

/* Unsplash helper */
const unsplashImages = {
  general: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  preventive: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95",
  cosmetic: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  orthodontics: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
  implants: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787",
  surgery: "https://images.unsplash.com/photo-1588774069160-bdb9f2df1f9c",
};
const services = [
  {
    title: "General Dentistry",
    tag: "Routine & Family Care",
    description:
      "Routine check-ups, dental hygiene, child teeth care, and preventive treatments focused on long-term oral health for all ages.",
    items: ["Routine Check-up", "Dental Hygiene", "Child Teeth Care"],
    image: unsplashImages.general,
  },
  {
    title: "Preventive Dentistry",
    tag: "Protect",
    description:
      "Prevent problems before they start with early diagnosis, cleanings, and laser-assisted treatments.",
    items: ["Laser RCT", "Tooth Extraction"],
    image: unsplashImages.preventive,
  },
  {
    title: "Cosmetic Dentistry",
    tag: "Enhance",
    description:
      "Advanced cosmetic solutions designed to improve aesthetics while maintaining a natural look.",
    items: ["Teeth Whitening", "Zirconia Crowns", "Tooth Veneers"],
    image: unsplashImages.cosmetic,
  },
  {
    title: "Orthodontics",
    tag: "Align",
    description:
      "Straighten your teeth comfortably with modern orthodontic treatments tailored to your lifestyle.",
    items: ["Invisible Aligners", "Braces Treatment"],
    image: unsplashImages.orthodontics,
  },
  {
    title: "Dental Implants",
    tag: "Restore",
    description:
      "Permanent tooth replacement solutions that restore function, confidence, and aesthetics.",
    items: ["Dental Implants", "Implant Crowns"],
    image: unsplashImages.implants,
  },
  {
    title: "Dental Surgeries",
    tag: "Surgical Care",
    description:
      "Precision surgical procedures performed with advanced technology and compassionate care.",
    items: ["Dental Surgeries", "Wisdom Tooth Removal"],
    image: unsplashImages.general,
  },
];


export default function Servicescard() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
            Comprehensive care for all ages
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch"
            >
              {/* Image Card */}
              <div className="rounded-2xl overflow-hidden shadow-md h-64 sm:h-auto">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 shadow-lg flex flex-col">
                <span className="text-xs tracking-widest uppercase text-slate-400">
                  {s.tag}
                </span>

                <h3 className="text-2xl font-bold mt-2 mb-4">
                  {s.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {s.description}
                </p>

                <ul className="space-y-2 text-sm mb-6">
                  {s.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button className="mt-auto inline-flex w-fit bg-white text-slate-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
