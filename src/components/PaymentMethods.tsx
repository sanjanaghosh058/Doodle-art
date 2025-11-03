'use client'

import { motion } from 'framer-motion'
import { QrCode, Banknote, Shield, Clock, Award } from 'lucide-react' // ✅ Added QrCode icon

const paymentMethods = [
  {
    icon: QrCode, // ✅ Fixed QR icon
    title: 'QR Payments',
    description: 'Secure and instant payments via PhonePe or Google Pay',
    features: ['Google Pay', 'PhonePe', 'UPI Payments'],
  },
  {
    icon: Banknote,
    title: 'Cash Payments',
    description: 'Traditional cash payments accepted on delivery or pickup',
    features: ['In-person delivery', 'Cash on delivery', 'Local pickup'],
  },
]

const features = [
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Your payments are protected with bank-level security.',
  },
  {
    icon: Clock,
    title: 'Quick Processing',
    description: 'Fast payment processing and instant confirmations.',
  },
  {
    icon: Award,
    title: 'Satisfaction Guaranteed',
    description: '100% satisfaction guarantee on all purchases.',
  },
]

export default function PaymentMethods() {
  return (
    <section
      id="payment"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-800 transition-colors"
    >
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Payment <span className="gradient-text">Options</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We accept cash, card, and compliments! Choose the payment method
            that works best for you.
          </p>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-8 mb-16"
        >
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center max-w-md hover:shadow-pink-500/10 hover:border-pink-400/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 pink-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
                <method.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {method.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {method.description}
              </p>

              {/* Features List */}
              <div className="space-y-2">
                {method.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1 + featureIndex * 0.05,
                    }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center space-x-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-2 h-2 bg-pink-500 rounded-full" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 rounded-3xl p-8 border border-pink-200 dark:border-pink-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Your Doodle?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Browse our gallery or create a custom piece — we make the payment
              process simple, secure, and stress-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#gallery"
                className="px-8 py-3 pink-gradient text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Gallery
              </motion.a>
              <motion.a
                href="#custom"
                className="px-8 py-3 border-2 border-pink-500 text-pink-600 dark:text-pink-400 rounded-xl font-semibold hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Custom Order
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
