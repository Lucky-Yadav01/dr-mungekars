import { TestimonialsColumn } from "./TestimonialsColumn";

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
  /* Mock testimonials data for dental clinic with Unsplash images */
  const testimonials = [
    {
      text: "Love this place and the aesthetic! Dr. Mungekar is a perfectionist. I always feel taken care of by the entire staff.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=400&h=400&fit=facearea&facepad=2&auto=format",
      name: "Heather N.",
    },
    {
      text: "Wonderful clinic and dentist. They go the extra mile to explain everything clearly and make you feel comfortable.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=400&h=400&fit=facearea&facepad=2&auto=format",
      name: "Rebecca N.",
    },
    {
      text: "I've never had such a calm dental experience. The team is kind, patient, and extremely professional.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=400&h=400&fit=facearea&facepad=2&auto=format",
      name: "Gina",
    },
    {
      text: "The whole team is amazing. They are so welcoming and genuinely care about their patients.",
      image: "https://images.unsplash.com/photo-1507892262247-395a67bb7e24?ixlib=rb-4.0.3&w=400&h=400&fit=facearea&facepad=2&auto=format",
      name: "Adriana P.",
    },
    {
      text: "Best dental experience I've had. The staff is warm, and the doctor explains every procedure step by step.",
      image: "https://images.unsplash.com/photo-1517841905240-08920f3e66e7?ixlib=rb-4.0.3&w=400&h=400&fit=facearea&facepad=2&auto=format",
      name: "Sarah M.",
    },
    {
      text: "Professional, caring, and thorough. Dr. Mungekar's attention to detail is unmatched. Highly recommend!",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&w=400&h=400&fit=facearea&facepad=2&auto=format",
      name: "Jessica R.",
    },
    {
      text: "The clinic environment is so calming. No anxiety here. Dr. Mungekar and team truly care about your comfort.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&w=400&h=400&fit=facearea&facepad=2&auto=format",
      name: "Michael T.",
    },
    {
      text: "Finally, a dentist who listens! Transparent pricing and honest advice. This is how healthcare should be.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=400&h=400&fit=facearea&facepad=2&auto=format",
      name: "David K.",
    },
    {
      text: "Exceptional service from start to finish. The team goes above and beyond for patient satisfaction.",
      image: "https://images.unsplash.com/photo-1533631231707-8a35cab1a803?ixlib=rb-4.0.3&w=400&h=400&fit=facearea&facepad=2&auto=format",
      name: "Jennifer L.",
    },
  ];

  /* === GOOGLE MAPS API INTEGRATION (COMMENTED FOR FUTURE USE) ===
   * To integrate Google Maps reviews for real-time testimonials:
   *
   * 1. Get Google Map Place ID:
   *    - Search for "Dr. Mungekar's Dental Clinic" on Google Maps
   *    - Extract the Place ID from the URL or use Google Places API
   *
   * 2. Install Google Maps React library:
   *    npm install google-map-react
   *
   * 3. Set up API Key:
   *    - Go to Google Cloud Console
   *    - Enable Places API and Maps JavaScript API
   *    - Create an API key
   *    - Add to .env file: REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key
   *
   * 4. Fetch reviews using useEffect:
   * 
   * import { useEffect, useState } from "react";
   * 
   * const [testimonials, setTestimonials] = useState([]);
   * 
   * useEffect(() => {
   *   const fetchGoogleReviews = async () => {
   *     try {
   *       const placeId = 'YOUR_PLACE_ID';
   *       const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
   *       
   *       const response = await fetch(
   *         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,name,rating&key=${apiKey}`
   *       );
   *       
   *       const data = await response.json();
   *       const googleReviews = data.result.reviews || [];
   *       
   *       // Format reviews to match testimonials structure
   *       const formattedReviews = googleReviews.map(review => ({
   *         text: review.text,
   *         image: review.profile_photo_url || 'https://via.placeholder.com/40',
   *         name: review.author_name,
   *         rating: review.rating,
   *       }));
   *       
   *       setTestimonials(formattedReviews);
   *     } catch (error) {
   *       console.error('Error fetching Google reviews:', error);
   *     }
   *   };
   *   
   *   fetchGoogleReviews();
   * }, []);
   * 
   */

  const experience = [
    {
      title: "Personalized Care",
      desc:
        "We take time to understand your health, goals, and comfort. Care that's thoughtful and patient-first.",
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

  // Split testimonials into columns for animated scroll
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="bg-[#f6f3ee] py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">

        {/* ================= EXPERIENCE SECTION ================= */}
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
            <div key={i} className="text-center px-6">
              <div className="flex justify-center mb-4">
                <Icon type={item.icon} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
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

        {/* ================= ANIMATED TESTIMONIALS SECTION ================= */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase text-gray-500">
            What Our Patients Say
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif text-gray-900">
            Word of Mouth
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Real feedback from patients who've experienced our personalized dental care
          </p>
        </div>

        {/* Animated testimonial columns */}
        <div className="flex justify-center gap-4 sm:gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] overflow-hidden">
          {/* Column 1 - faster scroll */}
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={15}
            className="w-full sm:w-80"
          />
          
          {/* Column 2 - hidden on mobile and tablet, visible on desktop */}
          <TestimonialsColumn
            testimonials={secondColumn}
            duration={19}
            className="hidden md:block w-full sm:w-80"
          />
          
          {/* Column 3 - hidden on mobile and tablet, visible on large desktop */}
          <TestimonialsColumn
            testimonials={thirdColumn}
            duration={17}
            className="hidden lg:block w-full sm:w-80"
          />
        </div>
      </div>
    </section>
  );
}
