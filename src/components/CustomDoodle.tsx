'use client'

import { motion } from 'framer-motion'
import { Palette, Clock, Star, Send } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast'

const customStyles = [
  { id: 'minimalist', name: 'Minimalist', price: 249, description: 'Clean, simple lines' },
  { id: 'detailed', name: 'Detailed', price: 800, description: 'Intricate patterns and details' },
  { id: 'abstract', name: 'Abstract', price: 550, description: 'Creative and artistic interpretation' },
  { id: 'realistic', name: 'Realistic', price: 650, description: 'Life-like representation' }
]

const sizes = [
  { id: 'small', name: 'Small (A5)', multiplier: 1 },
  { id: 'medium', name: 'Medium (A4)', multiplier: 1.5 },
  { id: 'large', name: 'Large (A3)', multiplier: 2 },
  { id: 'xlarge', name: 'Extra Large (A2)', multiplier: 2.5 }
]

const deadlines = [
  { id: '7days', name: '7 Days', multiplier: 1 },
  { id: '3days', name: '3 Days (Rush)', multiplier: 1.5 },
  { id: '1day', name: '24 Hours (Express)', multiplier: 2 }
]

export default function CustomDoodle() {
  const { addItem } = useCart()

  // Modes: picture (default) or sketch (upload mandatory)
  const [mode, setMode] = useState<'picture' | 'sketch'>('picture')

  const [formData, setFormData] = useState({
    description: '',
    style: '',
    size: '',
    deadline: '',
    name: '',
    email: ''
  })

  // File upload state
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  const calculatePrice = () => {
    const style = customStyles.find(s => s.id === formData.style)
    const size = sizes.find(s => s.id === formData.size)
    const deadline = deadlines.find(d => d.id === formData.deadline)

    if (!style || !size || !deadline) return 0

    return Math.round(style.price * size.multiplier * deadline.multiplier)
  }

  const handleFileChange = (f: File | null) => {
    if (!f) {
      setFile(null)
      return
    }
    if (!f.type.startsWith('image/')) {
      toast.error('Please select a valid image file.')
      return
    }
    const maxSize = 5 * 1024 * 1024
    if (f.size > maxSize) {
      toast.error('Image too large. Max 5MB.')
      return
    }
    setFile(f)
  }

  const handlePickFile = () => {
    inputRef.current?.click()
  }

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setFile(null)
    setPreviewUrl(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Required fields: style, size, deadline
    if (!formData.style || !formData.size || !formData.deadline) {
      toast.error('Please select style, size and deadline.')
      return
    }

    // picture mode: description required
    if (mode === 'picture' && !formData.description) {
      toast.error('Please provide a description for picture-based doodle.')
      return
    }

    // sketch mode: file required
    if (mode === 'sketch' && !file) {
      toast.error('Image upload is required for Sketch option.')
      return
    }

    const price = calculatePrice()

    const customItem = {
      id: Date.now(),
      title: `Custom Doodle - ${customStyles.find(s => s.id === formData.style)?.name || 'Custom'}`,
      price,
      image: previewUrl || 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg',
      category: 'Custom',
      isCustom: true,
      customDetails: {
        description: mode === 'picture' ? formData.description : formData.description || undefined,
        size: sizes.find(s => s.id === formData.size)?.name || '',
        style: customStyles.find(s => s.id === formData.style)?.name || '',
        deadline: deadlines.find(d => d.id === formData.deadline)?.name || '',
        mode
      }
    }

    // addItem payload should omit quantity (store will default/increment)
    addItem({
      id: customItem.id,
      title: customItem.title,
      price: customItem.price,
      image: customItem.image,
      category: customItem.category,
      isCustom: true,
      customDetails: customItem.customDetails as any
    })

    toast.success('Custom doodle added to cart!')

    // Reset
    setFormData({
      description: '',
      style: '',
      size: '',
      deadline: '',
      name: '',
      email: ''
    })
    handleRemoveFile()
    setMode('picture')
  }

  return (
    <section id="custom" className="py-20 px-6 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Order <span className="gradient-text">Custom Doodle</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose how you'd like your doodle — by photo or as a sketch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8"
        >
          {/* Mode selector — visually styled buttons */}
          <div className="mb-6 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMode('picture')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors border ${
                mode === 'picture'
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white border-transparent shadow'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-pink-400'
              }`}
            >
              Doodle by Pictures
            </button>

            <button
              type="button"
              onClick={() => setMode('sketch')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors border ${
                mode === 'sketch'
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white border-transparent shadow'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-pink-400'
              }`}
            >
              Doodle by Sketch (image required)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Describe Your Vision {mode === 'picture' ? '*' : '(optional)'}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={
                  mode === 'picture'
                    ? "Tell us what you'd like us to draw. Be as detailed as possible..."
                    : "Optional notes for the sketch (e.g., preferred mood, colors)."
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                required={mode === 'picture'}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {mode === 'sketch' ? 'Upload Reference Image (required)' : 'Upload Reference Image (optional)'}
              </label>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files ? e.target.files[0] : null
                  handleFileChange(f)
                }}
              />

              <div
                role="button"
                tabIndex={0}
                onClick={handlePickFile}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePickFile() }}
                className="flex items-center justify-between p-4 border-2 border-dashed rounded-xl cursor-pointer hover:border-pink-400 transition-colors bg-white dark:bg-gray-800"
              >
                <div className="flex items-center space-x-4">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
                      <span>PNG / JPG</span>
                    </div>
                  )}

                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {previewUrl ? 'Reference image selected' : 'Click to upload or drag & drop'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Max 5MB. {mode === 'sketch' ? 'Required for Sketch.' : 'Optional: helps us match your vision.'}
                    </div>
                  </div>
                </div>

                {previewUrl ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile()
                    }}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                ) : (
                  <div className="text-sm text-gray-400">Browse</div>
                )}
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Choose Style *
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {customStyles.map((style) => (
                  <motion.label
                    key={style.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.style === style.id
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      name="style"
                      value={style.id}
                      checked={formData.style === style.id}
                      onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{style.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{style.description}</div>
                      </div>
                      <div className="text-pink-600 dark:text-pink-400 font-bold">
                        ₹{style.price.toLocaleString()}
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Size and Deadline */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Size *
                </label>
                <div className="space-y-3">
                  {sizes.map((size) => (
                    <motion.label
                      key={size.id}
                      className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.size === size.id
                          ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={size.id}
                        checked={formData.size === size.id}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="sr-only"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">{size.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {size.multiplier}x price
                      </span>
                    </motion.label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Deadline *
                </label>
                <div className="space-y-3">
                  {deadlines.map((deadline) => (
                    <motion.label
                      key={deadline.id}
                      className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.deadline === deadline.id
                          ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="radio"
                        name="deadline"
                        value={deadline.id}
                        checked={formData.deadline === deadline.id}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="sr-only"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">{deadline.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {deadline.multiplier}x price
                      </span>
                    </motion.label>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Display */}
            {calculatePrice() > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-pink-200 dark:border-pink-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Price</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Based on your selections</p>
                  </div>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    ₹{calculatePrice().toLocaleString()}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-5 h-5" />
              <span>Add Custom Doodle to Cart</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {[
            { icon: Palette, title: 'Unique Design', description: 'Every piece is one-of-a-kind' },
            { icon: Clock, title: 'Fast Delivery', description: 'Quick turnaround times' },
            { icon: Star, title: 'Premium Quality', description: 'High-quality materials and craftsmanship' }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
            >
              <feature.icon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
