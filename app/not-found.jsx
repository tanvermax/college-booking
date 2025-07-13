"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  useEffect(() => {
    // Add any initialization logic here
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4 text-white overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 text-center max-w-2xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated 404 text */}
        <motion.div
          className="text-9xl font-bold mb-4 flex justify-center"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'mirror'
          }}
        >
          <motion.span 
            className="text-indigo-300"
            whileHover={{ scale: 1.1 }}
          >4</motion.span>
          <motion.span 
            className="text-purple-300 mx-2"
            whileHover={{ scale: 1.1 }}
          >0</motion.span>
          <motion.span 
            className="text-pink-300"
            whileHover={{ scale: 1.1 }}
          >4</motion.span>
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Oops! You've discovered uncharted territory
        </h1>

        <p className="text-lg mb-8 text-gray-300">
          The page you're looking for has been lost in space. 
          Maybe it was abducted by aliens or got caught in a black hole.
        </p>

        {/* Floating astronaut */}
        <motion.div
          className="absolute -right-20 -top-20 opacity-70"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'mirror'
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.7 1.115 5.328a.5.5 0 0 0 .71.532c1.36-.68 3.17-1.36 4.61-1.36 1.44 0 3.25.68 4.61 1.36a.5.5 0 0 0 .71-.532C19.598 13.7 20 11.892 20 10a8 8 0 0 0-8-8z" />
            <path d="m8 22 4-4 4 4" />
          </svg>
        </motion.div>

        {/* Interactive button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Beam Me Home</span>
            <motion.span
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </Link>
        </motion.div>

        {/* UFO that flies across screen occasionally */}
        <motion.div
          className="absolute -left-40 top-1/3 opacity-80"
          animate={{
            x: ['-100%', '150%']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatDelay: 10
          }}
        >
          <svg
            width="100"
            height="50"
            viewBox="0 0 100 50"
            fill="none"
          >
            <ellipse cx="50" cy="25" rx="50" ry="15" fill="#6EE7B7" />
            <circle cx="50" cy="15" r="10" fill="#EC4899" />
            <circle cx="35" cy="15" r="3" fill="#FFFFFF" />
            <circle cx="65" cy="15" r="3" fill="#FFFFFF" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;