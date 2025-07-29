"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaPuzzlePiece, FaRocket } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";
import { Proposition, Vdo } from "@/app/Types/TypesTest/setting.types";
import GameGuard from "@/app/components/GameGuard";

export default function Game3Step1Page() {
  const router = useRouter();
  const context = useContext(GameContext);

  const [selected, setSelected] = useState<Vdo | null>(null);
  const [game3, setGame3] = useState<Vdo[] | null>();
  const [shuffledAnswers, setShuffledAnswers] = useState<Vdo[]>([]);

  // useEffect(() => {
  //   if (context?.game3) {
  //     if (context?.game3.Vdo) {
  //       setGame3(context?.game3.Vdo)

  //     }
  //   }
  // }, [])

  useEffect(() => {
    if (context?.game3?.Vdo) {
      setGame3(context.game3.Vdo);
      const shuffled = shuffleArray(context.game3.Vdo);
      setShuffledAnswers(shuffled);
    }
  }, [context?.game3]);

  const handleNext = () => {
    try {
      if (!selected) return;

      const filtered = shuffledAnswers.filter((item) => item !== selected);
      const updated = [selected, ...filtered];

      console.log("selected:", selected);
      console.log("updated:", updated);

      context?.SetVdoGame3?.(updated);

      router.push("/game3step2"); // หรือ .replace
    } catch (err) {
      console.error("Navigation failed:", err);
    }
  };

  // ฟังก์ชัน shuffle
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [showIntro, setShowIntro] = useState(true);
  if (showIntro) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 p-6 font-mali">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl text-center"
        >
          <div className="pt-5 font-mali text-red-600 text-2xl md:text-4xl font-bold mb-6 drop-shadow-md px-6 py-4 rounded-2xl border-4 border-pink-400 bg-white/80 shadow-lg text-center">
            CheckPoint 3 ( เกมที่ 3 )
          </div>
          <img
            src="/img/3_0.png"
            alt="คำอธิบายด่านที่ 1"
            className="w-full h-auto rounded-3xl shadow-xl mb-6"
          />

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowIntro(false)}
              className="mt-4 px-8 py-3 text-xl font-bold rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition"
            >
              Next
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }
  return (
    <GameGuard>
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
            {shuffledAnswers.map((option) => (
              <motion.button
                key={option.Name}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelected(option);
                }}
                className={`px-6 py-4 text-lg md:text-xl rounded-full font-bold transition-all duration-300 border-4 shadow-md ${
                  selected === option
                    ? "bg-green-400 border-green-600 text-white"
                    : "bg-violet-300 border-gray-300 text-gray-800"
                }`}
              >
                {option.Name}
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
    </GameGuard>
  );
}
