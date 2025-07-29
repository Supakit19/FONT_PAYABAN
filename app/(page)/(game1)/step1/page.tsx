"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaRocket } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";
import { Proposition } from "@/app/Types/TypesTest/setting.types";
import GameGuard from "@/app/components/GameGuard";

export default function Step1Page() {
  const context = useContext(GameContext);
  const router = useRouter();

  const [selected, setSelected] = useState<{
    answer: string;
    isTrue: number;
  } | null>(null);
  const [game1, setGame1] = useState<Proposition | null>();
  const [showIntro, setShowIntro] = useState(true); // ✅ เพิ่มตรงนี้

  useEffect(() => {
    if (context?.game1) {
      context?.game1.Proposition.map((value) => {
        if (value.Point === "1") {
          setGame1(value);
        }
      });
    }
  }, []);

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledAnswers = useMemo(() => {
    return shuffleArray(game1?.Answer || []);
  }, [game1?.Answer]);

  const handleNext = () => {
    if (context && selected && game1) {
      if (selected.isTrue === 1) {
        context.updateScore();
      }
      const dataUpdate = {
        name: "1",
        pproposition: game1?.Proposition,
        answer: selected.answer,
        Right_wrong: selected.isTrue === 1 ? true : false,
      };

      context.updateGame1(dataUpdate);
    }

    router.push("/step2");
  };

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
            CheckPoint 1 ( เกมที่ 1 )
          </div>
          <img
            src="/img/1_0.png"
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
              เริ่มทำแบบทดสอบ
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <GameGuard>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 p-6 font-mali">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl text-pink-600 font-bold mb-6 text-center drop-shadow-sm"
        >
          {game1?.Proposition}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl text-center border-4 border-blue-200"
        >
          <p className="text-xl text-blue-700 font-bold mt-6 mb-3 flex items-center justify-center gap-2">
            <FaBullseye className="inline text-blue-700" />
            อายุที่ต้องประเมินคือ?
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {game1?.Answer.map((value: any) => (
              <motion.button
                key={value.answer}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelected(value);
                }}
                className={`px-6 py-4 text-lg md:text-xl rounded-full font-bold transition-all duration-300 border-4 shadow-md ${
                  selected === value
                    ? "bg-green-400 border-green-600 text-white"
                    : "bg-violet-300 border-gray-300 text-gray-800"
                }`}
              >
                {value.answer}
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
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } flex items-center justify-center gap-2`}
            >
              <FaRocket className="inline " />
              ถัดไป
            </motion.button>
          </div>
        </motion.div>
      </div>
    </GameGuard>
  );
}
