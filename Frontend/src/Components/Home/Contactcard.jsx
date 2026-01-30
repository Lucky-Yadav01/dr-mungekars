import React from "react";

/* Reusable container */
function Container({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export default function ContactCard() {
  return (
    <section className="py-16 bg-[#f7f3ed]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch bg-[#f4efe8] rounded-2xl overflow-hidden shadow-lg">

          {/* LEFT CONTENT */}
          <div className="p-8 sm:p-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Our Office
            </h2>

            <p className="text-gray-700 leading-relaxed mb-8">
              Visit our dental clinic and enjoy easy parking, compassionate care,
              and a comfortable environment for all ages. We look forward to
              welcoming you.
            </p>

            {/* ADDRESS */}
            <div className="mb-8">
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-gray-700">
                No 26, Nilje Gaon, Meadows Green,<br />
                Near Casa Rio Main Rd,<br />
                Dombivli East, Maharashtra 421204
              </p>

              <a
                href="https://maps.app.goo.gl/Xbj3fMjkqAj713Ki7"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-amber-600 font-medium underline"
              >
                Get Directions
              </a>
            </div>

            {/* MAP */}
            <div className="mb-10 rounded-lg overflow-hidden shadow">
              <iframe
                title="clinic-map"
                src="https://www.google.com/maps?q=No%2026%2C%20Nilje%20Gaon%2C%20Meadows%20Green%2C%20Dombivli%20East&z=15&output=embed"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* CONTACT + HOURS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <p className="text-gray-700">
                  Call/Text: <a href="tel:8928483233" className="underline">8928483233</a><br />
                  Email: info@drmungekars.com
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Hours</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Mon – Fri: 9:00am – 7:00pm<br />
                  Saturday: 9:00am – 2:00pm<br />
                  Sunday: Emergency Only
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1606813902917-3e7e6c2f7c0f?auto=format&fit=crop&w=1200&q=80"
              alt="Dental team"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

        </div>
      </Container>
    </section>
  );
}
