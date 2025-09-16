'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'

const faqData = [
  {
    id: 1,
    question: "Who are we and what we do?",
    answer: "Our startup was founded by Sanjana Ghosh, known by her creative pen name blvshy, whose passion for doodling sparked the journey. She is joined by Subhrajit Mukherjee (CTO), who brings the tech backbone to scale our creativity, and Somnil Neogi (CMO), who ensures our doodles reach the right audience in the most impactful way. Together, we blend art, technology, and storytelling into something truly special."
  },
  {
    id: 2,
    question: "Who are your doodles for?",
    answer: "Anyone! Our doodles are perfect for individuals who want personalized art, brands looking to stand out, event organizers needing eye-catching visuals, or even teachers and creators who want engaging content."
  },
  {
    id: 3,
    question: "What makes your doodles different from others?",
    answer: "Our doodles combine creativity, storytelling, and customization. Every doodle is hand-crafted (not just generated), ensuring each piece has a unique touch that reflects your personality or brand."
  },
  {
    id: 4,
    question: "Do you take custom requests?",
    answer: "Yes! You can send us your ideas, themes, or even rough sketches, and we'll turn them into one-of-a-kind doodles."
  },
  {
    id: 5,
    question: "What formats do you deliver doodles in?",
    answer: "We provide high-quality digital files (PNG, JPG, or SVG). On request, we can also arrange prints, stickers, or merchandise."
  },
  {
    id: 6,
    question: "How much does a doodle cost?",
    answer: "Prices vary depending on complexity, size, and usage (personal vs. commercial). We offer simple doodles starting at an affordable rate and custom packages for businesses."
  },
  {
    id: 7,
    question: "How long does it take to receive a doodle?",
    answer: "Most personal doodles are ready within 3–5 business days. Larger projects or bulk orders may take longer, but we'll always share a clear timeline upfront."
  },
  {
    id: 8,
    question: "Can businesses use your doodles for branding?",
    answer: "Absolutely! Our doodles are a great way to add playfulness and originality to brand identities, social media campaigns, and marketing materials."
  }
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section id="faq" className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block p-4 bg-pink-500/10 rounded-2xl mb-6"
          >
            <div className="text-4xl">❓</div>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our doodle art services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
            >
              <motion.button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
                whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {openItems.includes(item.id) ? (
                    <Minus className="w-6 h-6 text-pink-400" />
                  ) : (
                    <Plus className="w-6 h-6 text-pink-400" />
                  )}
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      exit={{ y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 pt-0 border-t border-gray-700"
                    >
                      <p className="text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-pink-900/20 to-orange-900/20 rounded-3xl p-8 border border-pink-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-8 py-3 pink-gradient text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}