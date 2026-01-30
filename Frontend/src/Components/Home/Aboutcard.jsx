import useUnsplashImages from "../../hooks/useUnsplashImages";

function AboutCardsSection() {
  const { images, loading, error } = useUnsplashImages(
    "modern dental clinic interior warm light dentist patient consultation",
    3
  );

  if (loading) {
    return (
      <section className="py-24 bg-[#f6f2ea]">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          Loading content…
        </div>
      </section>
    );
  }

  if (error || images.length < 3) return null;

  const [leftImg, rightImg, bottomImg] = images;

  return (
    <section className="py-24 bg-[#f6f2ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

          {/* LEFT CARD */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={leftImg.urls.regular}
              alt="Dental professional"
              className="w-[260px] h-[360px] rounded-2xl shadow-xl object-cover"
            />
          </div>

          {/* CENTER TEXT */}
          <div className="text-center">
            <p className="text-xs tracking-widest uppercase text-gray-600 mb-4">
              Welcome to Dr. Mungekar&apos;s Dental Clinic
            </p>

            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 leading-tight">
              Come as you are.
              <br />
              Leave smiling.
            </h2>

            <p className="mt-6 text-gray-700 leading-relaxed">
              We care about the person in the chair — not just their teeth.
              That means taking time to understand your health, your goals,
              and your past experiences.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Whether it’s your first visit or long-term care, we focus on
              honest communication, comfort, and confidence.
            </p>

            <button className="mt-8 bg-[var(--primary)] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">
              Your First Visit
            </button>
          </div>

          {/* RIGHT CARD */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={rightImg.urls.regular}
              alt="Dental reception"
              className="w-[300px] h-[360px] rounded-2xl shadow-xl object-cover"
            />
          </div>

        </div>

        {/* BOTTOM CARD */}
        <div className="mt-16 flex justify-center">
          <img
            src={bottomImg.urls.regular}
            alt="Dental consultation"
            className="w-full max-w-3xl h-[380px] rounded-2xl shadow-2xl object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default AboutCardsSection;
