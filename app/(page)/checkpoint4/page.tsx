"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaFlagCheckered,
  FaUserNurse,
  FaHeart,
  FaBandAid,
} from "react-icons/fa";

const stages = [
  {
    id: 1,
    label: "ด่านที่ 1",
    color: "from-red-400 to-red-600",
    emoji: "🌟",
    glowColor: "rgba(255, 99, 71, 0.6)",
  },
  {
    id: 2,
    label: "ด่านที่ 2",
    color: "from-orange-400 to-orange-600",
    emoji: "🍊",
    glowColor: "rgba(255, 165, 0, 0.6)",
  },
  {
    id: 3,
    label: "ด่านที่ 3",
    color: "from-yellow-400 to-yellow-600",
    emoji: "🌞",
    glowColor: "rgba(255, 255, 0, 0.6)",
  },
  {
    id: 4,
    label: "ด่านที่ 4",
    color: "from-green-400 to-green-600",
    emoji: "🌿",
    glowColor: "rgba(34, 197, 94, 0.6)",
  },
  {
    id: 5,
    label: "ด่านสุดท้าย",
    color: "from-blue-400 to-blue-600",
    emoji: "🏆",
    glowColor: "rgba(59, 130, 246, 0.6)",
  },
];

// Fireworks animation component
const Fireworks = ({ stageId }: { stageId: number }) => {
  const colors = [
    "from-red-500 to-pink-500",
    "from-yellow-500 to-orange-500",
    "from-blue-500 to-purple-500",
    "from-green-500 to-teal-500",
  ];
  const fireworkVariants = {
    initial: { scale: 0, opacity: 1, x: 0, y: 0 },
    animate: (i: number) => ({
      scale: 1.3 + Math.random() * 0.4,
      opacity: 0,
      x: Math.cos((i * Math.PI) / 5) * (30 + Math.random() * 20),
      y: Math.sin((i * Math.PI) / 5) * (30 + Math.random() * 20),
      transition: { duration: 1, ease: [0.42, 0, 0.58, 1], delay: i * 0.1 },
    }),
  };

  return (
    <div className="absolute -top-12 sm:-top-16 md:-top-20 left-1/2 transform -translate-x-1/2 z-20">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`firework-${stageId}-${i}`}
          className={`absolute w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-gradient-to-r ${
            colors[i % colors.length]
          }`}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};

// Sparkle animation component
const Sparkle = ({ stageId }: { stageId: number }) => {
  const sparkleVariants = {
    initial: { scale: 0, opacity: 1, rotate: 0 },
    animate: (i: number) => ({
      scale: 1.2,
      opacity: 0,
      rotate: 180,
      x: Math.cos((i * Math.PI) / 4) * 20,
      y: Math.sin((i * Math.PI) / 4) * 20,
      transition: { duration: 0.8, ease: "easeOut", delay: i * 0.2 },
    }),
  };

  return (
    <div className="absolute inset-0 z-10">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${stageId}-${i}`}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
          style={{
            left: `${50 + Math.cos((i * Math.PI) / 4) * 60}%`,
            top: `${50 + Math.sin((i * Math.PI) / 4) * 60}%`,
          }}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};

// Background particles component
const Particles = () => {
  const particleVariants = {
    animate: (i: number) => ({
      y: [0, -Math.random() * 150 - 50],
      x: [0, (Math.random() - 0.5) * 50],
      opacity: [0.3, 0.7, 0],
      transition: {
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        delay: i * 0.5,
      },
    }),
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-pink-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          variants={particleVariants}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};

export default function StagePathPage() {
  const router = useRouter();
  const currentStage = 1; // Starting at stage 1

  const goToStage = (stageId: number) => {
    if (stageId <= currentStage) {
      router.push(`/game/stage${stageId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 font-mali overflow-y-auto relative">
      {/* Subtle background pattern */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M20 20a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm10 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm-20 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0z\" fill=\"%23f0f0f0\" fill-opacity=\"0.3\"/%3E%3C/svg%3E')] opacity-50" /> */}

      {/* Animated particles */}
      <Particles />

      {/* Animated clouds */}
      <motion.div
        className="absolute top-8 left-8 text-4xl sm:text-5xl md:text-6xl text-white opacity-70"
        animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      >
        ☁️
      </motion.div>
      <motion.div
        className="absolute top-12 right-8 text-3xl sm:text-4xl md:text-5xl text-white opacity-70"
        animate={{ x: [-30, 0, -30], y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      >
        ☁️
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-lg mb-8 md:mb-12 text-center relative z-10"
      >
        CHECKPOINT
      </motion.h1>

      <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        {/* Winding road SVG with texture */}
        <svg
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 md:w-40 lg:w-48 h-[calc(100%-2rem)] z-0"
          viewBox="0 0 200 800"
          preserveAspectRatio="none"
        >
          <path
            d="M100,0 C150,100 50,200 100,300 C150,400 50,500 100,600 C150,700 50,750 100,800"
            fill="none"
            stroke="url(#roadGradient)"
            strokeWidth="60"
          />
          <path
            d="M100,0 C150,100 50,200 100,300 C150,400 50,500 100,600 C150,700 50,750 100,800"
            fill="none"
            stroke="url(#roadTexture)"
            strokeWidth="60"
            opacity="0.2"
          />
          <defs>
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#d1d5db", stopOpacity: 1 }}
              />
              <stop
                offset={`${(currentStage / stages.length) * 100}%`}
                style={{ stopColor: "#f87171", stopOpacity: 1 }}
              />
              <stop
                offset={`${(currentStage / stages.length) * 100}%`}
                style={{ stopColor: "#d1d5db", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#d1d5db", stopOpacity: 1 }}
              />
            </linearGradient>
            <pattern
              id="roadTexture"
              patternUnits="userSpaceOnUse"
              width="20"
              height="20"
            >
              <path d="M0 10h20M10 0v20" stroke="#a1a1a1" strokeWidth="2" />
            </pattern>
          </defs>
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 py-6 md:py-8">
          {/* Starting point */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="bg-white p-4 sm:p-5 md:p-6 rounded-full shadow-2xl border-4 border-pink-600"
          >
            <FaUserNurse className="text-4xl sm:text-5xl md:text-6xl text-pink-600 animate-pulse" />
          </motion.div>

          {/* Stages with decorative icons and animations */}
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3 + index * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="relative flex items-center"
            >
              <motion.button
                whileHover={{ scale: stage.id <= currentStage ? 1.1 : 1 }}
                whileTap={{ scale: stage.id <= currentStage ? 0.95 : 1 }}
                onClick={() => goToStage(stage.id)}
                className={`relative flex items-center justify-center gap-3 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-2xl shadow-xl text-base sm:text-lg md:text-xl font-bold text-white w-60 sm:w-64 md:w-68 lg:w-72 bg-gradient-to-r ${
                  stage.color
                } ${
                  stage.id <= currentStage
                    ? `opacity-100 hover:shadow-2xl glow-${stage.id}`
                    : "opacity-50 cursor-not-allowed"
                }`}
                disabled={stage.id > currentStage}
              >
                <span className="text-xl sm:text-2xl">{stage.emoji}</span>
                {stage.label}
                <FaMapMarkerAlt className="text-xl sm:text-2xl" />
                {/* Sparkle effect for current stage */}
                {stage.id === currentStage && <Sparkle stageId={stage.id} />}
              </motion.button>
              {/* Fireworks for current stage */}
              {stage.id === currentStage && <Fireworks stageId={stage.id} />}
              {/* Road marker dot */}
              <div className="absolute -left-12 sm:-left-14 md:-left-16 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-white rounded-full border-4 border-gray-600 -translate-x-1/2" />
              {/* Decorative icons */}
              <motion.div
                className="absolute -right-8 sm:-right-10 md:-right-12 text-2xl sm:text-3xl text-red-400"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 + index * 0.5 }}
              >
                {index % 2 === 0 ? <FaHeart /> : <FaBandAid />}
              </motion.div>
            </motion.div>
          ))}

          {/* Finish line */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.5 + stages.length * 0.2,
              type: "spring",
              stiffness: 120,
            }}
            className="bg-white p-4 sm:p-5 md:p-6 rounded-full shadow-2xl border-4 border-green-600"
          >
            <FaFlagCheckered className="text-4xl sm:text-5xl md:text-6xl text-green-600 animate-bounce" />
          </motion.div>
        </div>
      </div>

      {/* Additional decorative icons at bottom */}
      <motion.div
        className="absolute bottom-8 left-10 sm:left-16 md:left-20 text-3xl sm:text-4xl text-red-300 opacity-80"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <FaHeart />
      </motion.div>
      <motion.div
        className="absolute bottom-12 right-10 sm:right-16 md:right-20 text-3xl sm:text-4xl text-red-300 opacity-80"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3.5 }}
      >
        <FaBandAid />
      </motion.div>

      {/* Custom CSS for glow effect */}
      <style jsx>{`
        .glow-1 {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8),
            0 0 25px rgba(255, 99, 71, 0.6);
        }
        .glow-2 {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8),
            0 0 25px rgba(255, 165, 0, 0.6);
        }
        .glow-3 {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8),
            0 0 25px rgba(255, 255, 0, 0.6);
        }
        .glow-4 {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8),
            0 0 25px rgba(34, 197, 94, 0.6);
        }
        .glow-5 {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8),
            0 0 25px rgba(59, 130, 246, 0.6);
        }
      `}</style>
    </div>
  );
}
