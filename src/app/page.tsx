'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Sparkles, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import AboutUs from '@/components/AboutUs'
import CustomDoodle from '@/components/CustomDoodle'
import FAQ from '@/components/FAQ'
import PaymentMethods from '@/components/PaymentMethods'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Gallery />
      <AboutUs />
      <CustomDoodle />
      <FAQ />
      <PaymentMethods />
      <Footer />
    </main>
  )
}