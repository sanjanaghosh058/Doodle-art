"use client";

import { motion } from "framer-motion";
import { Code, Palette, TrendingUp, Star, Heart, Zap } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Sanjana Ghosh",
    role: "CEO & Artist",
    alias: "blvshy",
    description:
      "The creative visionary whose passion for doodling sparked our journey. She transforms ideas into beautiful, hand-crafted art pieces.",
    image: "/about/sanjana.jpg",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    skills: [
      "Hand-drawn Art",
      "Creative Direction",
      "Brand Identity",
      "Visual Storytelling",
    ],
  },
  {
    name: "Subhrajit Mukherjee",
    role: "CTO",
    alias: "Tech Maestro",
    description:
      "The tech architect behind our digital ecosystem. Subhrajit ensures our platform is fast, scalable, and beautifully engineered to showcase creativity seamlessly.",
    image: "/about/subhrajit.jpg",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: [
      "Next.js & React",
      "System Architecture",
      "Automation & AI Integration",
      "Performance Optimization",
    ],
  },
  {
    name: "Somnil Neogi",
    role: "CMO",
    alias: "Rick",
    description:
      "The marketing maestro who ensures our doodles reach the right audience in the most impactful way.",
    image: "/about/somnil.jpg",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    skills: [
      "Digital Marketing",
      "Brand Strategy",
      "Content Creation",
      "Growth Hacking",
    ],
  },
];

const companyValues = [
  {
    icon: Heart,
    title: "Passion-Driven",
    description:
      "Every doodle is created with love and genuine passion for art",
  },
  {
    icon: Star,
    title: "Quality First",
    description:
      "We never compromise on the quality and uniqueness of our work",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Blending traditional art with modern technology and storytelling",
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block p-4 bg-pink-500/10 rounded-2xl mb-6"
          >
            <div className="text-4xl">👥</div>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet Our <span className="gradient-text">Creative Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're a passionate team of creators, technologists, and storytellers
            who believe that art has the power to transform spaces and touch
            hearts.
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                className="bg-gray-800 rounded-3xl p-8 border border-gray-700 hover:border-pink-500/50 transition-all duration-500 relative overflow-hidden"
                whileHover={{ y: -10 }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Profile Image */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-2xl object-cover"
                    />
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${member.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>

                  {/* Role Icon */}
                  <motion.div
                    className={`absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r ${member.color} rounded-xl flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <member.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  {member.alias && (
                    <p className="text-pink-400 text-sm mb-2 font-medium">
                      aka {member.alias}
                    </p>
                  )}
                  <p
                    className={`text-transparent bg-gradient-to-r ${member.color} bg-clip-text font-semibold mb-4`}
                  >
                    {member.role}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {member.description}
                  </p>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold text-sm">
                      Expertise:
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: index * 0.2 + skillIndex * 0.1,
                          }}
                          viewport={{ once: true }}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs border border-gray-600 hover:border-pink-500/50 transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-12">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-500/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <value.icon className="w-8 h-8 text-pink-400" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-pink-900/20 to-blue-900/20 rounded-3xl p-8 border border-pink-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Work With Us?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's create something amazing together. Whether it's a personal
              doodle or a brand campaign, we're here to bring your vision to
              life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#custom"
                className="px-8 py-3 pink-gradient text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-3 border-2 border-pink-500 text-pink-400 rounded-xl font-semibold hover:bg-pink-500/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
