'use client'

import { motion } from 'framer-motion'
import { Palette, ShoppingCart, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import CartModal from './CartModal'

export default function Header() {
  const { items } = useCart()
  const [isDark, setIsDark] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    // Force dark mode
    const shouldBeDark = true
    
    setIsDark(shouldBeDark)
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  const toggleTheme = () => {
    // Keep dark mode only
    return
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 w-full backdrop-blur-md z-50 border-b transition-colors ${
          isDark 
            ? 'bg-gray-900/80 border-pink-500/20' 
            : 'bg-white/80 border-pink-200'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <Palette className="w-8 h-8 text-pink-500" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h1 className="text-2xl font-bold gradient-text">DoodleArt</h1>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'Gallery', 'About', 'Custom', 'FAQ'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors ${
                    isDark 
                      ? 'text-gray-300 hover:text-pink-400' 
                      : 'text-gray-700 hover:text-pink-600'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 pink-gradient text-white rounded-full hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}