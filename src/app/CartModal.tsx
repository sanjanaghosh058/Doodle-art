'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useState } from 'react'
import CheckoutModal from '@/components/CheckoutModal'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCheckout = () => {
    if (items.length === 0) return
    setIsCheckoutOpen(true)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="w-6 h-6 text-pink-500" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto max-h-96">
                {items.length === 0 ? (
                  <div className="p-12 text-center">
                    <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 dark:text-gray-400">Add some beautiful doodles to get started!</p>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</h3>
                          {item.isCustom && item.customDetails && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <p>{item.customDetails.style} • {item.customDetails.size}</p>
                              <p>Deadline: {item.customDetails.deadline}</p>
                            </div>
                          )}
                          <p className="text-pink-600 dark:text-pink-400 font-bold">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span className="text-gray-900 dark:text-white">Total:</span>
                    <span className="text-pink-600 dark:text-pink-400">
                      ₹{getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={clearCart}
                      className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Clear Cart
                    </button>
                    <motion.button
                      onClick={handleCheckout}
                      className="flex-1 px-6 py-3 pink-gradient text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Checkout
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={items}
      />
    </>
  )
}