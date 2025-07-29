"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { CheckCircle, XCircle, Gamepad2 } from "lucide-react"; // ใช้ไอคอนจาก Lucide
import { Vdo } from "@/app/Types/TypesTest/setting.types";
import { GameContext } from "@/app/Contexts/Game/game.context";
import { config } from "@/app/Config/config";
import GameGuard from "@/app/components/GameGuard";
export default function Game3Step2() {

  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const context = useContext(GameContext);

  const [selected, setSelected] = useState<Vdo | null>(null);
  const [game3, setGame3] = useState<
    { name: string; url: string; Answer: number; Proposition: string }[] | []
  >([]);
  const [shuffledAnswers, setShuffledAnswers] = useState<Vdo[]>([]);

  // useEffect(() => {
  //   if (context?.game3) {
  //     if (context?.game3.Vdo) {
  //       setGame3(context?.game3.Vdo)

  //     }
  //   }
  // }, [])

  useEffect(() => {
    if (context?.gamevdo3) {
      const newdata: {
        name: string;
        url: string;
        Answer: number;
        Proposition: string;
      }[] = [];

      context.gamevdo3.forEach((game) => {
        game.VDO.forEach((vdo) => {
          newdata.push({
            name: game.Name,
            url: vdo.url,
            Answer: vdo.Answer,
            Proposition: vdo.Proposition,
          });
        });
      });

      setGame3(newdata);
    }
  }, [context?.gamevdo3]); // ✅ ผูกกับ gamevdo3

  const handleAnswer = (isCorrect: number) => {
    if (currentQuestion < game3.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      if (isCorrect === game3[currentQuestion].Answer) {
        context?.updateScore();
      }
      const updateVDO = {
        name: game3[currentQuestion].name,
        VDO: game3[currentQuestion].url,
        answer: isCorrect.toString(),
        Right_wrong: isCorrect === game3[currentQuestion].Answer ? true : false,
      };
      context?.updateGame3(updateVDO);
    } else {
      router.push("/game4step1");
    }
  };
  if (game3.length === 0) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <GameGuard>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 font-mali">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center text-xl md:text-3xl lg:text-4xl text-blue-600 font-bold mb-4 text-center drop-shadow-sm gap-2"
        >
          <Gamepad2 size={40} className="text-purple-500" />
          <span>{game3[currentQuestion].name}</span>
          <Gamepad2 size={40} className="text-pink-500" />
        </motion.div>

        <div className="text-center text-lg md:text-xl font-semibold text-gray-700 mt-2">
          {game3[currentQuestion].Proposition}
        </div>
        <div className="w-full max-w-xl flex flex-col items-center space-y-4 pt-3">
          <video
            key={currentQuestion}
            // src={`https://your-database-url/video${currentQuestion + 1}.mp4`}
            controls
            className="w-full aspect-video rounded-lg shadow-lg"
          >
            {" "}
            <source
              src={config.image + game3[currentQuestion].url}
              type="video/mp4"
            />{" "}
          </video>

          {/* ปุ่มตอบ */}
          <div className="flex gap-10 mt-4 justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleAnswer(1)}
              className="flex flex-col items-center text-green-500"
            >
              <CheckCircle size={80} />
              <span className="mt-1 text-base font-bold">ผ่าน</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleAnswer(0)}
              className="flex flex-col items-center text-red-500"
            >
              <XCircle size={80} />
              <span className="mt-1 text-base font-bold">ไม่ผ่าน</span>
            </motion.button>
          </div>
        </div>
      </div>
    </GameGuard>
  );
}
