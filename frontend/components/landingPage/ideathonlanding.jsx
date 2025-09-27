"use client";
import { Navbar } from "../navbarcomps/navbar"
import { Users, Lightbulb, Trophy } from "lucide-react"
// import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../../public/assest/animation.json";
import { motion } from 'framer-motion';
import { IdeathonStepper, DynamicImage } from "./helpers";
import Benefits from "./Benefits";
import Link from "next/link";

// // Animation variants
// const fadeInUp = {
//   initial: { opacity: 0, y: 30 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.8, ease: "easeOut" }
// };

// const fadeInLeft = {
//   initial: { opacity: 0, x: -30 },
//   animate: { opacity: 1, x: 0 },
//   transition: { duration: 0.8, ease: "easeOut" }
// };

// const fadeInRight = {
//   initial: { opacity: 0, x: 30 },
//   animate: { opacity: 1, x: 0 },
//   transition: { duration: 0.8, ease: "easeOut" }
// };

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function IdeaThonsLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Use the separated Navbar component */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            className="space-y-6 lg:space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              Brilliant Minds Think Differently — Together.
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            >
              Run an ideathon — a short idea challenge where people from your field
              help you improve, challenge, or rethink your concept. In the end, the
              best idea wins.
            </motion.p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="flex justify-center lg:justify-end order-first lg:order-last"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <motion.div
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-120 xl:h-120 rounded-3xl flex items-center justify-center"
              whileHover={{
                scale: 1.05,
                rotate: 1,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <img src="/think.png" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Post an Ideathon Section */}
      <motion.section
        className="bg-gray-50 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h3
              className="text-4xl font-bold text-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              Post an ideathon
            </motion.h3>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            >
              Run ideathons — short idea challenges where you post a concept and others help
              improve, challenge, or reimagine it. Get diverse input from people who understand
              your field. The best idea rises to the top.
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-12">
            {/* Interactive Stepper */}
            <motion.div
              className="mt-12"  
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <IdeathonStepper />
            </motion.div>
            {/* Dynamic Image */}
            <motion.div
              className="w-full h-full flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <DynamicImage />
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center space-y-4"
              variants={scaleIn}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <motion.div
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto"
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Users className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h4 className="text-xl font-bold text-black">Collaborative Innovation</h4>
              <p className="text-gray-600">
                Harness the collective intelligence of your field to refine and improve your ideas.
              </p>
            </motion.div>

            <motion.div
              className="text-center space-y-4"
              variants={scaleIn}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <motion.div
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Lightbulb className="w-8 h-8 text-green-600" />
              </motion.div>
              <h4 className="text-xl font-bold text-black">Fresh Perspectives</h4>
              <p className="text-gray-600">
                Get insights from diverse minds that can challenge and enhance your thinking.
              </p>
            </motion.div>

            <motion.div
              className="text-center space-y-4"
              variants={scaleIn}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <motion.div
                className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto"
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Trophy className="w-8 h-8 text-purple-600" />
              </motion.div>
              <h4 className="text-xl font-bold text-black">Best Ideas Win</h4>
              <p className="text-gray-600">
                Merit-based system ensures the most valuable contributions rise to the top.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      <Benefits/>

      {/* Footer */}
      <motion.footer
        className="border-t border-gray-200 py-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              className="text-xl font-bold text-black"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
            <Link href="/" className="flex items-center">
                <img src="/Logo.svg" alt="logo" />
             </Link>
            </motion.div>
            <motion.div
              className="flex space-x-6 text-sm text-gray-600"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <motion.a
                href="#"
                className="hover:text-black transition-colors"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Privacy
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-black transition-colors"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Terms
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-black transition-colors"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Support
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}