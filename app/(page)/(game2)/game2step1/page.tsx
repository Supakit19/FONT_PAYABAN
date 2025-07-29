"use client";

import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRocket } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";
import { Proposition } from "@/app/Types/TypesTest/setting.types";
import GameGuard from "@/app/components/GameGuard";
export default function HomeGame3_2() {
  const router = useRouter();
  const context = useContext(GameContext);
  const [showIntro, setShowIntro] = useState(true);
  const [selected, setSelected] = useState<{
    answer: string;
    isTrue: number;
  } | null>(null);
  const [game2, setGame2] = useState<Proposition | null>();

  useEffect(() => {
    if (context?.game2) {
      context?.game2.Proposition.map((value) => {
        if (value.Point === "1") {
          console.log(value);
          setGame2(value);
        }
      });
    }
  }, []);

  const handleNext = () => {
    if (context && selected && game2) {
      if (selected.isTrue == 1) {
        context.updateScore();
      }
      const dataUpdategame2 = {
        name: "1",
        pproposition: game2?.Proposition,
        answer: selected.answer,
        Right_wrong: selected.isTrue === 1 ? true : false,
      };
      console.log("data", dataUpdategame2);
      context.updateGame2(dataUpdategame2);
    }

    router.push("/game3step1");
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
            CheckPoint 2 ( เกมที่ 2 )
          </div>
          <img
            src="/img/2_0.png"
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
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-blue-100 to-pink-100 p-6 font-mali">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl text-pink-600 font-bold mb-6 text-center drop-shadow-sm"
        >
          {game2?.Proposition}
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
            {game2?.Answer.map((option: any) => (
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
    </GameGuard>
  );
}
