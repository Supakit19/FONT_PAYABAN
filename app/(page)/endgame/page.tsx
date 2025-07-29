"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FiRefreshCw } from "react-icons/fi";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import GameGuard from "@/app/components/GameGuard";
import { GameContext } from "@/app/Contexts/Game/game.context";
import { config } from "@/app/Config/config";
import Swal from "sweetalert2";

export default function EndPage() {
  const context = useContext(GameContext);
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubDetail, setOpenSubDetail] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const hasPosted = useRef(false);

  const fakeScore = context?.gameData.score ?? 0;
  // const totalScore = 10;

  useEffect(() => {
    if (hasPosted.current) return;
    const postGameData = async () => {
      try {
        const response = await fetch(config.url + "game/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(context?.gameData),
        });
        if (response.ok) {
          hasPosted.current = true;
        }
      } catch (error) {
        console.error("Post game data failed:", error);
      }
    };

    postGameData();
  }, [context?.gameData]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  function getGame3Details(game3Array: any[]) {
    const grouped = game3Array.reduce((acc, item) => {
      if (!acc[item.name]) acc[item.name] = [];
      acc[item.name].push(item);
      return acc;
    }, {} as Record<string, any[]>);

    return Object.entries(grouped).map(([name, items]) => ({
      groupName: name,
      totalScore: (items as any[]).reduce(
        (sum: number, i: any) => sum + (i.Right_wrong ? 1 : 0),
        0
      ),
      details: (items as any[]).map((item: any, idx: number) => ({
        label: `ข้อที่ ${idx + 1}`,
        score: item.Right_wrong ? 1 : 0,
      })),
    }));
  }

  const game3Array = context?.gameData?.gamedetail?.game3 ?? [];
  const game3DetailsGrouped = getGame3Details(game3Array);

  const gameDetails = [
    {
      game: "เกมที่ 1: ",
      score:
        context?.gameData?.gamedetail?.game1?.reduce(
          (sum: number, g: any) => sum + (g?.Right_wrong ? 1 : 0),
          0
        ) ?? 0,
      maxScore: 3,
    },
    {
      game: "เกมที่ 2: ",
      score:
        context?.gameData?.gamedetail?.game2?.reduce(
          (sum: number, g: any) => sum + (g?.Right_wrong ? 1 : 0),
          0
        ) ?? 0,
      maxScore: 1,
    },
    {
      game: "เกมที่ 3: ",
      score:
        game3Array.reduce(
          (sum: number, g: any) => sum + (g?.Right_wrong ? 1 : 0),
          0
        ) ?? 0,

      groupedDetails: game3DetailsGrouped,
    },
    {
      game: "เกมที่ 4: ",
      score:
        context?.gameData?.gamedetail?.game4?.reduce(
          (sum: number, g: any) => sum + (g?.Right_wrong ? 1 : 0),
          0
        ) ?? 0,
      maxScore: 2,
    },
  ];

  const handleNext = () => {
    router.push("/datasetstd");
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
            ประเมินเสร็จสิ้นแล้ว
          </div>
          <img
            src="/img/00.png"
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

  function getMedalImage(score: number): { label: string; image: string } {
    if (score >= 14) {
      return { label: "เหรียญทอง", image: "/im/gold.png" };
    } else if (score >= 8) {
      return { label: "เหรียญเงิน", image: "/img/silver.png" };
    } else {
      return { label: "เหรียญทองแดง", image: "/img/bronze.png" };
    }
  }
  const medal = getMedalImage(fakeScore);

  return (
    <GameGuard>
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-6 font-mali"
        style={{
          backgroundImage: "url('/img/background.jfif')",
          backgroundBlendMode: "lighten",
        }}
      >
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={300}
          />
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md text-center border-2 border-purple-200"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold text-purple-600 mb-4 drop-shadow-sm">
            ประเมินเสร็จสิ้นแล้ว!
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-6 font-semibold">
            คุณได้รับรางวัล
          </p>

          <div className="flex flex-col items-center justify-center mb-4">
            <motion.img
              src={medal.image}
              alt={medal.label}
              className="w-[280px] h-auto drop-shadow-2xl mb-4"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 0.8,
              }}
            />

            <span className="text-xl md:text-2xl font-bold text-gray-800">
              {medal.label}
            </span>
            {/* <span className="text-gray-500 mt-1 text-sm">
              คะแนนรวม: {fakeScore} คะแนน
            </span> */}
          </div>

          <div className="text-center mb-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center gap-2 mx-auto text-purple-600 hover:text-purple-800 font-semibold"
            >
              <ChevronDown
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
              แสดงคะแนนแต่ละด่าน
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6 text-left"
              >
                <ul className="space-y-2 text-gray-700 text-sm">
                  {gameDetails.map((item, index) => (
                    <div key={index}>
                      <li
                        className={`bg-purple-100 rounded-lg px-4 py-2 flex justify-between items-center shadow cursor-pointer ${
                          item.groupedDetails ? "hover:bg-purple-200" : ""
                        }`}
                        onClick={() => {
                          if (item.groupedDetails) {
                            setOpenSubDetail((prev) =>
                              prev === index ? null : index
                            );
                          }
                        }}
                      >
                        <span className="flex items-center gap-2">
                          {item.groupedDetails && (
                            <ChevronDown
                              size={18}
                              className={`transition-transform ${
                                openSubDetail === index ? "rotate-180" : ""
                              }`}
                            />
                          )}
                          {item.game}
                        </span>
                        <span className="font-bold text-green-600">
                          {item.score}
                          {item.maxScore !== undefined && (
                            <span className="text-gray-500">
                              {" "}
                              / {item.maxScore}
                            </span>
                          )}
                        </span>
                      </li>

                      {item.groupedDetails && openSubDetail === index && (
                        <div className="ml-6 mt-2 space-y-4">
                          {item.groupedDetails.map((group, gIndex) => (
                            <div
                              key={gIndex}
                              className="bg-white rounded-lg p-3 border border-purple-300 shadow-sm"
                            >
                              <div className="font-semibold mb-2">
                                {group.groupName} — คะแนน {group.totalScore}
                              </div>
                              <ul className="space-y-1">
                                {group.details.map((detail, dIndex) => (
                                  <li
                                    key={dIndex}
                                    className="flex justify-between border-b border-gray-200 pb-1"
                                  >
                                    <span>{detail.label}</span>
                                    <span className="font-bold text-green-500">
                                      {detail.score}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-lg text-gray-600 mb-6">
            ขอบคุณที่เข้าร่วมการประเมินนะคะ
          </p>

          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.07, backgroundColor: "#a78bfa" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="mt-4 px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FiRefreshCw className="text-xl" />
              กลับไปหน้าแรก
            </motion.button>
          </div>
        </motion.div>
      </div>
    </GameGuard>
  );
}
