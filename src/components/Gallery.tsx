'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Filter, Search } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast'
import Image from 'next/image'

const doodleArtworks = [
  {
    id: 1,
    title: 'Cloud Dreams',
    price: 249,
    image: '/doodle/cloud.jpg',
    category: 'Nature',
    description: 'Dreamy cloud formations in artistic style'
  },
  {
    id: 2,
    title: 'Custom Art',
    price: 249,
    image: '/doodle/customized.jpg',
    category: 'Custom',
    description: 'Personalized doodle art just for you'
  },
  {
    id: 3,
    title: 'Dogesh Portrait',
    price: 249,
    image: '/doodle/dogesh.jpg',
    category: 'Portrait',
    description: 'Cute dog portrait in doodle style'
  },
  {
    id: 4,
    title: 'Flower Power',
    price: 249,
    image: '/doodle/flower.jpg',
    category: 'Nature',
    description: 'Beautiful floral doodle design'
  },
  {
    id: 5,
    title: 'Hope & Dreams',
    price: 249,
    image: '/doodle/hope.jpg',
    category: 'Inspirational',
    description: 'Uplifting and motivational artwork'
  },
  {
    id: 6,
    title: 'Sweet Lollypop',
    price: 249,
    image: '/doodle/lolypop.jpg',
    category: 'Fun',
    description: 'Colorful and playful candy art'
  },
  {
    id: 7,
    title: 'Nature Scene',
    price: 249,
    image: '/doodle/nature.jpg',
    category: 'Nature',
    description: 'Serene nature landscape doodle'
  },
  {
    id: 8,
    title: 'Somnil Art',
    price: 249,
    image: '/doodle/somnil.jpg',
    category: 'Portrait',
    description: 'Artistic portrait in unique style'
  }
]

const categories = ['All', 'Nature', 'Custom', 'Portrait', 'Inspirational', 'Fun']

export default function Gallery() {
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredArtworks = doodleArtworks.filter(artwork => {
    const matchesCategory = selectedCategory === 'All' || artwork.category === selectedCategory
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (artwork: typeof doodleArtworks[0]) => {
    addItem(artwork)
    toast.success(`${artwork.title} added to cart!`)
  }

  return (
    <section id="gallery" className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our collection of unique hand-drawn doodles, each piece crafted with love and attention to detail.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-6 mb-12"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'pink-gradient text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg card-hover group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.button
                  onClick={() => handleAddToCart(artwork)}
                  className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-500 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {artwork.title}
                    </h3>
                    <span className="text-sm text-pink-600 dark:text-pink-400 font-medium">
                      {artwork.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{artwork.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {artwork.description}
                </p>

                <motion.button
                  onClick={() => handleAddToCart(artwork)}
                  className="w-full py-3 pink-gradient text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No artworks found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}