"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { FaPuzzlePiece, FaRocket } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";
import { Proposition } from "@/app/Types/TypesTest/setting.types";
import GameGuard from "@/app/components/GameGuard";
import Swal from "sweetalert2";

export default function Game4Step1Page() {
  const context = useContext(GameContext);
  const router = useRouter();

  const [selected, setSelected] = useState<
    { answer: string; isTrue: number }[]
  >([]);
  const [game4, setGame4] = useState<Proposition | null>();

  // ตรวจสอบว่าอยู่ในช่วงอายุ 30–42 เดือน
  // const isTwoAnswerAge =
  //   context?.gameData?.age &&
  //   +context.gameData.age >= 30 &&
  //   +context.gameData.age <= 42;
  const ageNumber = parseInt(
    context?.gameData?.age?.replace(/\D/g, "") || "0",
    10
  );
  const isTwoAnswerAge = ageNumber >= 30 && ageNumber <= 42;
  useEffect(() => {
    if (context?.game4) {
      context?.game4.Proposition.map((value) => {
        if (value.Point === "1") {
          setGame4(value);
        }
      });
    }
  }, [context?.game3]);

  const handleSelect = (option: { answer: string; isTrue: number }) => {
    const exists = selected.find((s) => s.answer === option.answer);
    if (isTwoAnswerAge) {
      if (exists) {
        setSelected(selected.filter((s) => s.answer !== option.answer));
      } else if (selected.length < 2) {
        setSelected([...selected, option]);
      }
    } else {
      setSelected([option]);
    }
  };

  const handleNext = () => {
    if (!game4 || !context) return;

    if (isTwoAnswerAge && selected.length !== 2) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกคำตอบให้ครบ 2 ข้อ",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (!isTwoAnswerAge && selected.length !== 1) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกคำตอบ",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const isCorrect = selected.some((opt) => opt.isTrue === 1);
    if (isCorrect) context.updateScore();

    const dataUpdategame4 = {
      name: "1",
      pproposition: game4.Proposition,
      answer: selected.map((s) => s.answer).join(", "),
      Right_wrong: isCorrect,
    };

    context.updateGame4(dataUpdategame4);
    router.push("/game4step2");
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
            CheckPoint 4 ( เกมที่ 4 )
          </div>
          <img
            src="/img/4_0.png"
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
          <FaPuzzlePiece className="inline-block mr-2" />
          {game4?.Proposition}
          <span className="ml-2">
            <FaPuzzlePiece />
          </span>
        </motion.div>

        {isTwoAnswerAge && (
          <p className="text-center text-sm text-gray-600 mb-2">
            (เลือกได้ 2 คำตอบ)
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8 w-full max-w-lg md:max-w-2xl lg:max-w-3xl text-center border-2 md:border-4 border-green-200"
        >
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            {game4?.Answer.map((option: any, idx: any) => {
              const isSelected = selected.find(
                (s) => s.answer === option.answer
              );
              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleSelect(option)}
                  className={`px-6 py-4 text-lg md:text-xl rounded-full font-bold transition-all duration-300 border-4 shadow-md ${
                    isSelected
                      ? "bg-green-400 border-green-600 text-white"
                      : "bg-violet-300 border-gray-300 text-gray-800"
                  }`}
                >
                  {option.answer}
                </motion.button>
              );
            })}
          </div>

          <div className="flex justify-center mt-4">
            <motion.button
              whileHover={{
                scale:
                  (isTwoAnswerAge && selected.length === 2) ||
                  (!isTwoAnswerAge && selected.length === 1)
                    ? 1.1
                    : 1,
              }}
              whileTap={{
                scale:
                  (isTwoAnswerAge && selected.length === 2) ||
                  (!isTwoAnswerAge && selected.length === 1)
                    ? 0.95
                    : 1,
              }}
              onClick={handleNext}
              disabled={
                isTwoAnswerAge ? selected.length !== 2 : selected.length !== 1
              }
              className={`mt-8 px-10 py-4 text-2xl font-bold rounded-full shadow-xl transition ${
                (isTwoAnswerAge ? selected.length === 2 : selected.length === 1)
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } flex items-center justify-center gap-2`}
            >
              <FaRocket className="inline-block mr-2" />
              ถัดไป
            </motion.button>
          </div>
        </motion.div>
      </div>
    </GameGuard>
  );
}
