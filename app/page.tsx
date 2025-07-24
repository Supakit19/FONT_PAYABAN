"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";

export default function HomeStartPage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/datasetstd");
  };

  return (
    <div
      className="relative h-screen w-full flex flex-col items-center justify-center bg-cover bg-center "
      style={{
        backgroundImage: "url('/img/background.jfif')",
      }}
    >
      <div className="font-mali text-red-600 text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
        หนูน้อยพัฒนาการสมวัย
      </div>

      <div className="flex gap-10">
        <motion.button
          whileHover={{ scale: 1.1, rotate: -3 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6"
          onClick={handleNavigate}
        >
          <motion.img
            src="/img/1.png"
            style={{ width: "400px", height: "400px" }}
            alt="play button"
            className="w-32 drop-shadow-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.1, rotate: -3 }}
        whileTap={{ scale: 0.9 }}
        className="mt-6"
        onClick={handleNavigate}
      >
        <motion.img
          src="/img/play.png"
          alt="play button"
          className="w-32 drop-shadow-xl mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </motion.button>
    </div>
  );
}
