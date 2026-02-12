import { Link } from 'react-router-dom'
import useUnsplashImages from '../../hooks/useUnsplashImages'

/* ================= TECHNOLOGY INTRO SECTION ================= */
function TechnologyIntroSection() {
  const { images, loading } = useUnsplashImages(
    'modern dental technology dentist patient consultation',
    1
  )
  const { images: techImages, loading: techLoading } = useUnsplashImages(
  'dental technology clinic equipment',
  6
)


  const image =
    images && images.length > 0
      ? images[0].urls?.regular || images[0]
      : ''

  return (
    <>
      {/* ================= IMAGE + CONTENT ================= */}
      <section className="bg-[#F4F0E6] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div className="w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden shadow-lg">
            {!loading && image && (
              <img
                src={image}
                alt="Dental technology consultation"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Content */}
          <div className="bg-[#FBF7EF] rounded-2xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-serif text-[#2F2B25]">
              Fewer appointments, less guesswork, better results
            </h2>

            <p className="mt-4 text-[#5A564C] leading-relaxed">
              At Dr. Mungekar’s Dental Clinic, we’ve invested in advanced dental
              technology that makes your time with us faster, more comfortable,
              and more precise.
            </p>

            <p className="mt-4 text-[#5A564C] leading-relaxed">
              These tools allow us to diagnose problems earlier, treat them with
              greater accuracy, and help you recover more quickly.
            </p>

            <Link
              to="/book"
              className="inline-block mt-6 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded-full transition"
            >
              Request Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-sm tracking-widest text-amber-600 font-medium">
            DENTISTRY DONE DIFFERENTLY
          </p>

          <h3 className="mt-4 text-3xl md:text-4xl font-serif text-[#2F2B25]">
            How our dental technology benefits you
          </h3>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            
            {/* Card 1 */}
            <div>
              <h4 className="text-xl font-semibold text-[#2F2B25]">
                A gentler dental experience
              </h4>
              <p className="mt-3 text-[#5A564C] leading-relaxed">
                Advanced laser technology lets us work with pinpoint accuracy,
                often with little to no anesthesia. Less noise, less vibration,
                and faster recovery.
              </p>
            </div>

            {/* Card 2 */}
            <div>
              <h4 className="text-xl font-semibold text-[#2F2B25]">
                Results in one visit
              </h4>
              <p className="mt-3 text-[#5A564C] leading-relaxed">
                In-office milling and digital workflows allow crowns and
                restorations to be completed in a single appointment — no
                temporaries, no long waits.
              </p>
            </div>

            {/* Card 3 */}
            <div>
              <h4 className="text-xl font-semibold text-[#2F2B25]">
                Clarity at every step
              </h4>
              <p className="mt-3 text-[#5A564C] leading-relaxed">
                High-resolution 3D scans and digital imaging help us explain
                your options clearly so you can make confident decisions about
                your care.
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* ================= ADVANCED TECHNOLOGY GRID ================= */}
<section className="bg-[#F7F3EA] py-20">
  <div className="max-w-7xl mx-auto px-5">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto mb-14">
      <p className="text-sm tracking-widest uppercase text-[#B08A4F]">
        Dentistry done differently
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-serif text-[#2E2B26]">
        Dr. Mungekar's dental technology that works for you
      </h2>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: 'Solea Laser',
          desc: 'Quiet, no-drill treatment for cavities and soft-tissue care, often anesthesia-free.',
        },
        {
          title: 'Biolase Epic Soft Tissue Laser',
          desc: 'Comfortable gum therapy, contouring, and faster healing.',
        },
        {
          title: 'Glidewell Fastmill I.O.',
          desc: 'Same-day design and milling of crowns, inlays, and onlays.',
        },
        {
          title: 'iTero Lumina Digital Scanner',
          desc: 'Fast, mess-free 3D imaging for accurate planning.',
        },
        {
          title: 'Digital X-Rays',
          desc: 'High-resolution images with significantly reduced radiation.',
        },
        {
          title: 'Intraoral Cameras',
          desc: 'See what we see and understand every recommendation.',
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-[#1F1F1F] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
        >
          {/* Image */}
          

          <div className="h-48 w-full bg-gray-200">
  {!techLoading && techImages[i] ? (
    <img
      src={techImages[i].urls?.regular}
      alt={techImages[i].alt_description || item.title}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  ) : (
    <div className="w-full h-full bg-gray-300 animate-pulse" />
  )}
</div>


          {/* Content */}
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold text-[#E6C17A]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    </>
  )
}

export default TechnologyIntroSection
