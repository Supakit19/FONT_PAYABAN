"use client";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRocket } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";

export default function HomeGame3_2() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const context = useContext(GameContext);
  const handleNext = () => {
    router.push("/game3step1");
  };

  const updateScore = () => {
    if (context) {
      context.updateScore();
    }
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-blue-100 to-pink-100 p-6 font-mali">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl text-pink-600 font-bold mb-6 text-center drop-shadow-sm"
      >
        เลือกวิธีการสร้างสัมพันธภาพ
      </motion.div>
      {/* <div className="flex gap-10 ">
        <motion.button
          whileHover={{ scale: 1.1, rotate: -3 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6"
        >
          <motion.img
            src="/img/babytree.jpg"
            style={{ width: "500px", height: "400px" }}
            alt="play button"
            className="w-32 drop-shadow-xl rounded-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
        </motion.button>
      </div> */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl text-center border-4 border-blue-200"
      >
        <div className="flex flex-wrap justify-center gap-4 pt-10">
          {["เลือกทักทายผู้ปกครองก่อนทักทายเด็ก", "ทักทายเด็กก่อนได้เลย"].map(
            (option) => (
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
            )
          )}
        </div>
        <motion.button
          whileHover={{ scale: selected ? 1.1 : 1 }}
          whileTap={{ scale: selected ? 0.95 : 1 }}
          onClick={handleNext}
          disabled={!selected}
          className={`mt-8 px-10 py-4 text-2xl font-bold rounded-full shadow-xl transition ${
            selected
              ? "bg-pink-500 hover:bg-pink-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FaRocket className="inline mr-2" /> ถัดไป
        </motion.button>
      </motion.div>
    </div>
  );
}
