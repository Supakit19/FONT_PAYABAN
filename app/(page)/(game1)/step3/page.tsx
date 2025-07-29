"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { FaSearch, FaCheck, FaRocket } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";
import { Proposition } from "@/app/Types/TypesTest/setting.types";
import { config } from "@/app/Config/config";
import GameGuard from "@/app/components/GameGuard";
export default function Step3Page() {
  const router = useRouter();

  const context = useContext(GameContext);

  const [selected, setSelected] = useState<{
    answerimage: string;
    isTrue: number;
  } | null>(null);
  const [game1, setGame1] = useState<Proposition | null>();

  useEffect(() => {
    if (context?.game1) {
      context?.game1.Proposition.map((value) => {
        if (value.Point === "3") {
          console.log(value);
          setGame1(value);
        }
      });
    }
  }, []);

  // น shuffle
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // ใช้ useMemo เพื่อสุ่มแค่ตอน game1?.Answer เปลี่ยน
  const shuffledAnswers = useMemo(() => {
    return shuffleArray(game1?.Answer || []);
  }, [game1?.Answer]);

  const handleNext = () => {
    if (context && selected && game1) {
      if (selected.isTrue === 1) {
        context.updateScore();
      }
      const dataUpdate = {
        name: "3",
        pproposition: game1?.Proposition,
        answer: selected.answerimage,
        Right_wrong: selected.isTrue === 1 ? true : false,
      };
      console.log("data", dataUpdate);

      context.updateGame1(dataUpdate);
    }

    router.push("/game2step1");
  };

  return (
    <GameGuard>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100 p-2 md:p-6 font-mali">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl lg:text-5xl text-green-600 font-bold mb-4 md:mb-6 text-center drop-shadow-sm flex items-center justify-center gap-2"
        >
          {/* <FaTeddyBear className="inline-block" /> */}
          {game1?.Proposition}
          <FaSearch className="inline-block ml-2" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8 w-full max-w-lg md:max-w-2xl lg:max-w-3xl text-center border-2 md:border-4 border-green-200"
        >
          <p className="text-base md:text-lg lg:text-xl text-gray-800 mb-2 md:mb-4 leading-relaxed">
            จากสถานการณ์ตัวอย่างควรเลือกอุปกรณ์
            <br />
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
            {game1?.Answer.map((child: any, idx: number) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.07, rotate: -3 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 md:mt-6 w-full flex flex-col items-center"
                onClick={() => {
                  setSelected(child);
                }}
                style={{
                  border: selected === child ? "3px solid #22c55e" : "none",
                  borderRadius: "16px",
                  padding: "8px",
                  background: selected === child ? "#e6ffe6" : "white",
                }}
              >
                <motion.img
                  src={`${config.image}${child.answerimage}`}
                  style={{ width: "100px", height: "260px" }}
                  alt={child.name}
                  className="w-20 md:w-32 drop-shadow-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                />
                <span className="mt-2 text-xl">
                  <FaCheck />
                </span>
              </motion.button>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <motion.button
              whileHover={{ scale: selected ? 1.07 : 1 }}
              whileTap={{ scale: selected ? 0.97 : 1 }}
              onClick={handleNext}
              disabled={!selected}
              className={`mt-6 md:mt-8 px-6 md:px-10 py-3 md:py-4 text-lg md:text-2xl font-bold rounded-full shadow-xl transition ${
                selected
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } flex items-center justify-center gap-2`}
            >
              <FaRocket />
              ไปเกม 2
            </motion.button>
          </div>
        </motion.div>
      </div>
    </GameGuard>
  );
}
