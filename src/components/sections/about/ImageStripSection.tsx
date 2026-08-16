import { Reveal } from "../../ui/RevealAnimation";
import Image from "next/image";

const images = [
  { src: '/images/clinic/clinic entrance.jpg', alt: 'Amethyst Skin Clinic entrance' },
  { src: '/images/clinic/reception area.jpg', alt: 'Amethyst Skin Clinic reception' },
  { src: '/images/clinic/waiting area.jpg', alt: 'Amethyst Skin Clinic waiting area' },
  { src: '/images/clinic/doctor image.jpg', alt: 'Dr. Shruthi Pavana Janardhanan' },
]

export default function ImageStripSection() {
  return (
    <section className="py-20 md:py-28 overflow-hidden" style={{ background: '#F7F3EF' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Top row: single large image */}
        <Reveal delay={0.1}>
          <div
            className="group relative overflow-hidden rounded-[16px] mb-2"
            style={{ height: 300, boxShadow: "0 8px 24px rgba(91,31,106,0.12)" }}
          >
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Reveal>

        {/* Bottom row: three equal images */}
        <div className="grid grid-cols-3 gap-2">
          {images.slice(1).map((img, i) => (
            <Reveal key={i} delay={0.2 + i * 0.1}>
              <div
                className="group relative overflow-hidden rounded-[12px]"
                style={{ height: 180, boxShadow: "0 8px 24px rgba(91,31,106,0.12)" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}