import React from 'react'
import {
  CheckCircle,
  Smile,
  Plus,
  Scissors,
  Zap,
  Trash2,
  Award,
  Layers,
  Camera,
  Monitor,
  Image,
  Target,
  Search,
} from 'lucide-react'

const services = [
  { name: 'Routine Check-up', icon: CheckCircle },
  { name: 'Invisible Aligners', icon: Smile },
  { name: 'Dental Implant', icon: Plus },
  { name: 'Dental Surgeries', icon: Scissors },
  { name: 'Laser RCT', icon: Zap },
  { name: 'Tooth Extraction', icon: Trash2 },
  { name: 'Braces Treatment', icon: Award },
  { name: 'Child Teeth Care', icon: Layers },
  { name: 'Zirconia Crowns', icon: Award },
  { name: 'Tooth Veneers', icon: Layers },
]

const equipments = [
  { name: 'Intra-Oral Camera', icon: Camera },
  { name: 'Dental Laser', icon: Zap },
  { name: 'Digital RVG X-Ray', icon: Monitor },
  { name: 'Digital OPG (Full Mouth X-Ray) Machine', icon: Image },
  { name: 'Integrated Endomotor', icon: Target },
  { name: 'Digital Scanner For Accurate Measurements', icon: Search },
]

export default function Services() {
  return (
    <div style={{ background: '#F4F0E6' }} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <header className="mb-8 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold"
            style={{ color: '#efdf53ff' }}
          >
            Treatments We Provide
          </h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: '#3E3B32' }}>
            Evidence-based treatments delivered with compassionate care.
          </p>
        </header>

        {/* Services Grid */}
        <section className="mb-12">
          <div
            className="grid gap-4 sm:gap-6"
            style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}
          >
            {/* small default is 2 columns, adjust with responsive CSS below */}
            <style>
              {`
                @media (min-width: 768px) {
                  .services-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
                }
                @media (min-width: 1024px) {
                  .services-grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
                }
              `}
            </style>

            <div className="services-grid col-span-full grid gap-4">
              {services.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.name}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm transform transition hover:shadow-lg hover:scale-[1.02]"
                    role="article"
                    aria-label={s.name}
                    style={{ borderLeft: '4px solid #efdf53ff' }}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className="p-3 rounded-md"
                        style={{ background: 'rgba(91,143,168,0.08)' }}
                      >
                        <Icon size={28} className="text-[#5B8FA8]" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold" style={{ color: '#3E3B32' }}>
                        {s.name}
                      </h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section>
          <header className="mb-6 text-center">
            <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#efdf53ff' }}>
              Our Advanced Dental Equipments
            </h3>
            <p className="mt-2 text-sm" style={{ color: '#3E3B32' }}>
              Modern technology to support precise, comfortable treatments.
            </p>
          </header>

          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}
          >
            <style>
              {`
                @media (min-width: 768px) {
                  .equip-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
                }
                @media (min-width: 1024px) {
                  .equip-grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
                }
              `}
            </style>

            <div className="equip-grid col-span-full grid gap-6">
              {equipments.map((e) => {
                const Icon = e.icon
                return (
                  <div
                    key={e.name}
                    className="bg-white rounded-lg overflow-hidden shadow-sm transform transition hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div
                      className="w-full h-40 flex items-center justify-center"
                      style={{ background: 'linear-gradient(180deg, rgba(91,143,168,0.06), rgba(197,176,73,0.03))' }}
                    >
                      <Icon size={48} className="text-[#5B8FA8]" />
                    </div>

                    <div className="p-4">
                      <h4 className="text-sm font-semibold" style={{ color: '#3E3B32' }}>
                        {e.name}
                      </h4>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}