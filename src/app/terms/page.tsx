"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, FileText, Users, CreditCard } from "lucide-react";
import Link from "next/link";

export default function TermsAndConditions() {
  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using DoodleArt's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      icon: Shield,
      title: "2. Service Description",
      content:
        "DoodleArt provides hand-drawn doodle art services including pre-made artworks and custom doodle creation. All artworks are original creations by our artists and are protected by copyright laws.",
    },
    {
      icon: CreditCard,
      title: "3. Payment Terms",
      content:
        "We accept payments via cash, card, UPI, and QR code payments. All prices are in Indian Rupees (₹). Payment must be completed before artwork delivery. Custom orders require full payment upfront.",
    },
    {
      icon: Users,
      title: "4. Custom Orders",
      content:
        "Custom doodle orders are non-refundable once work has begun. Delivery times are estimates and may vary based on complexity. We reserve the right to decline custom orders that violate our content policy.",
    },
  ];

  const additionalTerms = [
    {
      title: "5. Intellectual Property",
      content:
        "Upon full payment, customers receive usage rights for personal use. Commercial usage requires separate licensing agreement. DoodleArt retains copyright and may use artworks for promotional purposes.",
    },
    {
      title: "6. Delivery and Returns",
      content:
        "Digital artworks are delivered via email within specified timeframes. Physical prints are shipped within 5-7 business days. Returns are accepted only for damaged physical products within 7 days of delivery.",
    },
    {
      title: "7. Privacy Policy",
      content:
        "We collect and store customer information necessary for order fulfillment. Personal data is not shared with third parties except for payment processing and shipping. We use cookies to improve user experience.",
    },
    {
      title: "8. Limitation of Liability",
      content:
        "DoodleArt's liability is limited to the amount paid for the specific artwork. We are not responsible for indirect damages or losses arising from the use of our services.",
    },
    {
      title: "9. Modifications",
      content:
        "We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of our services constitutes acceptance of modified terms.",
    },
    {
      title: "10. Contact Information",
      content:
        "For questions about these terms, please contact us at hello@doodleart.com or +91 98765 43210. Our business address is Kolkata, India.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Terms and <span className="gradient-text">Conditions</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our
            services.
          </p>
          <div className="mt-4 text-sm text-gray-400">
            Last updated: September 2025
          </div>
        </motion.div>

        {/* Main Sections */}
        <div className="grid gap-6 lg:gap-8 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-pink-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Terms */}
        <div className="space-y-6 lg:space-y-8">
          {additionalTerms.map((term, index) => (
            <motion.div
              key={term.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: sections.length * 0.1 + index * 0.05,
              }}
              className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700"
            >
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">
                {term.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{term.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 lg:mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-pink-900/20 to-orange-900/20 rounded-3xl p-6 lg:p-8 border border-pink-700">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-gray-300 mb-6">
              If you have any questions about these Terms and Conditions, please
              don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@doodleart.com"
                className="px-6 lg:px-8 py-3 pink-gradient text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Email Us
              </a>
              <a
                href="tel:+919876543210"
                className="px-6 lg:px-8 py-3 border-2 border-pink-500 text-pink-400 rounded-xl font-semibold hover:bg-pink-500/10 transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
