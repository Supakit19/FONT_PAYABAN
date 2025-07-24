"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { FaPuzzlePiece, FaRocket } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";

export default function Game3Step1Page() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const context = useContext(GameContext);
  const handleNext = () => {
    router.push("/game3step2");
  };

  const updateScore = () => {
    if (context) {
      context.updateScore();
    }
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-2 md:p-6 font-mali">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-4xl lg:text-5xl text-blue-600 font-bold mb-4 md:mb-6 text-center drop-shadow-sm flex items-center justify-center gap-2"
      >
        <FaPuzzlePiece className="inline-block text-blue-600" />
        พัฒนาการที่ต้องการประเมิน
        <FaPuzzlePiece className="inline-block text-purple-600" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl text-center border-4 border-blue-200"
      >
        <div className="flex flex-wrap justify-center gap-4 pt-10">
          {["GM", "FM", "RL", "EL", "PS"].map((option) => (
            <motion.button
              key={option}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSelected(option);
                updateScore();
              }}
              className={`px-6 py-4 text-lg md:text-xl rounded-full font-bold transition-all duration-300 border-4 shadow-md ${
                selected === option
                  ? "bg-green-400 border-green-600 text-white"
                  : "bg-violet-300 border-gray-300 text-gray-800"
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <motion.button
            whileHover={{ scale: selected ? 1.1 : 1 }}
            whileTap={{ scale: selected ? 0.95 : 4 }}
            onClick={handleNext}
            disabled={!selected}
            className={`mt-8 px-10 py-4 text-2xl font-bold rounded-full shadow-xl transition ${
              selected
                ? "bg-pink-500 hover:bg-pink-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } flex items-center gap-2`}
          >
            <FaRocket />
            ถัดไป
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
