import HeroAboutSection from '@/components/sections/about/HeroAboutSection'
import DoctorBioSection from '@/components/sections/about/DoctorBioSection'
import StatsSection from '@/components/sections/about/StatsSection'
import ValuesSection from '@/components/sections/about/ValuesSection'
import GalleryGridSection from '@/components/sections/about/GalleryGridSection'


export const metadata = {
  title: 'About Dr. Shruthi Pavana Janardhanan | Amethyst Skin Clinic',
  description: 'Board-certified dermatologist with 8 years of experience in clinical and aesthetic dermatology. MD from Madras Medical College, DNB, MRCP SCE Dermatology (UK).',
}

export default function AboutPage() {
  return (
    <main>
      <HeroAboutSection />
      <DoctorBioSection />
      <StatsSection />
      <ValuesSection />
      <GalleryGridSection />
    </main>
  )
}