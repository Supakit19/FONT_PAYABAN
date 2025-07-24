"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FiRefreshCw } from "react-icons/fi";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function EndPage() {
  const router = useRouter();
  const { width, height } = useWindowSize(); // ✅ ดึงขนาดจอ
  const [isOpen, setIsOpen] = useState(false);
  const [openSubDetail, setOpenSubDetail] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  const fakeScore = 10;
  const totalScore = 10;

  // หยุดพรุภายใน 5 วินาที
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const gameDetails = [
    { game: "เกมที่ 1: ", score: 2 },
    { game: "เกมที่ 2: ", score: 2 },
    {
      game: "เกมที่ 3: ",
      score: 2,
      details: [
        { game: "ด้านการเคลื่อนไหว1:", score: 2 },
        { game: "ด้านการเคลื่อนไหว2:", score: 2 },
        { game: "ด้านการเคลื่อนไหว3:", score: 2 },
        { game: "ด้านการเคลื่อนไหว4:", score: 2 },
      ],
    },
    { game: "เกมที่ 4: ", score: 2 },
    { game: "เกมที่ 5: ", score: 2 },
  ];

  const handleNext = () => {
    router.push("/home1");
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-6 font-mali"
      style={{
        backgroundImage: "url('/img/background.jfif')",
        backgroundBlendMode: "lighten",
      }}
    >
      {/* 🎉 พรุ */}
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />
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
          คุณได้คะแนน
        </p>

        <div className="text-6xl md:text-7xl font-extrabold text-green-500 mb-4 drop-shadow-lg flex items-center justify-center gap-2">
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
            }}
          >
            {fakeScore}
          </motion.span>
          <span className="text-gray-400 text-4xl">/</span>
          <span className="text-gray-600">{totalScore}</span>
        </div>

        {/* ปุ่มแสดงคะแนน */}
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

        {/* รายละเอียดแต่ละด่าน */}
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
                        item.details ? "hover:bg-purple-200" : ""
                      }`}
                      onClick={() => {
                        if (item.details) {
                          setOpenSubDetail((prev) =>
                            prev === index ? null : index
                          );
                        }
                      }}
                    >
                      <span className="flex items-center gap-2">
                        {item.details && (
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
                        {item.score} / 2
                      </span>
                    </li>

                    {/* รายละเอียดย่อยของเกมที่ 3 */}
                    {item.details && openSubDetail === index && (
                      <ul className="ml-6 mt-2 space-y-1">
                        {item.details.map((detail, subIdx) => (
                          <li
                            key={subIdx}
                            className="bg-white rounded-lg px-4 py-2 flex justify-between items-center border border-purple-300 shadow-sm"
                          >
                            <span>{detail.game}</span>
                            <span className="font-bold text-green-500">
                              {detail.score} / 2
                            </span>
                          </li>
                        ))}
                      </ul>
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
  );
}
