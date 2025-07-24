"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaTools, FaBrain, FaRocket } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";

export default function Step2Page() {
  const context = useContext(GameContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const age = searchParams.get("age");

  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    router.push("step3");
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
        className="text-3xl md:text-5xl text-blue-600 font-bold mb-6 text-center drop-shadow-sm flex items-center justify-center gap-2"
      >
        <FaTools className="inline-block" />
        เลือกเครื่องมือประเมินพัฒนาการ
        <FaBrain className="inline-block ml-2" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl text-center border-4 border-blue-200"
      >
        <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
          จากสถานการณ์ตัวอย่างควรเลือกใช้เครื่องมือ
          <br />
        </p>

        <div className="flex justify-center gap-4">
          {["DSPM", "DAIM"].map((option) => (
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
            whileTap={{ scale: selected ? 0.95 : 1 }}
            onClick={handleNext}
            disabled={!selected}
            className={`mt-8 px-10 py-4 text-2xl font-bold rounded-full shadow-xl transition ${
              selected
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } flex items-center justify-center gap-2`}
          >
            <FaRocket />
            ถัดไป
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
