'use client'

import { useEffect, useRef, useState } from 'react'
import { stats } from '@/lib/data/about'
import { Stat } from '@/types'
import Image from 'next/image'

function useCountUp(target: string, isVisible: boolean) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isVisible) return
    const numericPart = parseFloat(target.replace(/[^0-9.]/g, ''))
    const suffix = target.replace(/[0-9.]/g, '')
    if (isNaN(numericPart)) {
      setTimeout(() => setDisplay(target), 0)
      return
    }
    let start = 0
    const duration = 1500
    const step = numericPart / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= numericPart) {
        setDisplay(target)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(start) + suffix)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target])

  return display
}

function StatItem({ value, label, isVisible }: { value: string; label: string; isVisible: boolean }) {
  const display = useCountUp(value, isVisible)
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <span className="font-serif text-4xl md:text-5xl font-medium text-white">{display}</span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-white/80">{label}</span>
    </div>
  )
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20" style={{ background: '#F7F3EF' }}>
      <div ref={sectionRef} className="relative rounded-2xl overflow-hidden" style={{ minHeight: '400px' }}>
        <Image src="/images/clinic/clinic corridor.JPG" alt="" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: '#5A2A5D', opacity: 0.75 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(42,15,45,0.7) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat: Stat, i) => (
              <StatItem key={i} value={stat.value} label={stat.label} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}