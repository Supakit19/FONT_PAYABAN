"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTools, FaBrain, FaRocket } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";
import { Proposition } from "@/app/Types/TypesTest/setting.types";
import GameGuard from "@/app/components/GameGuard";
export default function Step2Page() {
  const context = useContext(GameContext);
  const router = useRouter();

  const [selected, setSelected] = useState<{
    answer: string;
    isTrue: number;
  } | null>(null);
  const [game1, setGame1] = useState<Proposition | null>();

  useEffect(() => {
    if (context?.game1) {
      context?.game1.Proposition.map((value) => {
        if (value.Point === "2") {
          console.log(value);
          setGame1(value);
        }
      });
    }
  }, []);

  const handleNext = () => {
    if (context && selected && game1) {
      if (selected.isTrue === 1) {
        context.updateScore();
      }
      const dataUpdate = {
        name: "2",
        pproposition: game1?.Proposition,
        answer: selected.answer,
        Right_wrong: selected.isTrue === 1 ? true : false,
      };
      console.log("data", dataUpdate);

      context.updateGame1(dataUpdate);
    }

    router.push("/step3");
  };
  return (
    <GameGuard>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-blue-100 to-pink-100 p-6 font-mali">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl text-blue-600 font-bold mb-6 text-center drop-shadow-sm flex items-center justify-center gap-2"
        >
          <FaTools className="inline-block" />
          {game1?.Proposition}
          <FaBrain className="inline-block ml-2" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl text-center border-4 border-blue-200"
        >
          <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
            <br />
          </p>

          <div className="flex justify-center gap-4">
            {game1?.Answer.map((option: any) => (
              <motion.button
                key={option.answer}
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
                {option.answer}
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
    </GameGuard>
  );
}
