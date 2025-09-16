'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Sparkles, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-2 text-pink-600 dark:text-pink-400"
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Premium Hand-Drawn Art</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-5xl lg:text-7xl font-bold leading-tight"
              >
                Unique{' '}
                <span className="gradient-text">Doodle</span>
                <br />
                Art Collection
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed"
              >
                Discover one-of-a-kind hand-drawn doodles that bring personality and charm to any space. 
                We accept cash, card, and compliments!
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#gallery"
                className="px-8 py-4 pink-gradient text-white rounded-full font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Gallery</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="#custom"
                className="px-8 py-4 border-2 border-pink-500 text-pink-600 dark:text-pink-400 rounded-full font-semibold text-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Custom Order</span>
                <Heart className="w-5 h-5" />
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-center space-x-8 pt-8"
            >
              {[
                { number: '500+', label: 'Happy Customers' },
                { number: '1000+', label: 'Artworks Created' },
                { number: '5★', label: 'Average Rating' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                className="relative z-10 animate-float"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Image
                  src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Beautiful doodle art"
                  width={600}
                  height={600}
                  className="rounded-3xl shadow-2xl object-cover"
                  priority
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute -top-4 -right-4 bg-orange-500 text-white p-4 rounded-2xl shadow-lg z-20"
              >
                <Star className="w-6 h-6" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute -bottom-4 -left-4 bg-pink-500 text-white p-4 rounded-2xl shadow-lg z-20"
              >
                <Heart className="w-6 h-6" />
              </motion.div>

              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-orange-200 dark:from-pink-900/30 dark:to-orange-900/30 rounded-3xl transform rotate-6 scale-105 -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}