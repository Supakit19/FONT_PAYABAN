"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { CheckCircle, XCircle, Gamepad2 } from "lucide-react"; // ใช้ไอคอนจาก Lucide

const questions = [
  {
    question: "เด็กสามารถกระโดดข้ามสิ่งกีดขวางได้หรือไม่?",
    vdo: "/img/vdo_1.mp4",
  },
  {
    question: "เด็กสามารถเดินต่อเนื่องได้โดยไม่ล้ม?",
    vdo: "/img/vdo_2.mp4",
  },
  {
    question: "เด็กสามารถยืนขาเดียวได้นานกว่า 10 วินาที?",
    vdo: "/img/vdo_3.mp4",
  },
  {
    question: "เด็กสามารถวิ่งแล้วหยุดได้อย่างมั่นคง?",
    vdo: "/img/vdo_4.mp4",
  },
  {
    question: "เด็กสามารถปีนขึ้นลงบันไดได้เอง?",
    vdo: "/img/vdo_5.mp4",
  },
];
 

export default function Game3Step1Page() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      router.push("/game4step1");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 font-mali">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center text-xl md:text-3xl lg:text-4xl text-blue-600 font-bold mb-4 text-center drop-shadow-sm gap-2"
      >
        <Gamepad2 size={40} className="text-purple-500" />
        <span>ด้านการเคลื่อนไหว</span>
        <Gamepad2 size={40} className="text-pink-500" />
      </motion.div>
     
      <div className="text-center text-lg md:text-xl font-semibold text-gray-700 mt-2">
        {questions[currentQuestion].question}
      </div>
      <div className="w-full max-w-xl flex flex-col items-center space-y-4 pt-3">
    
        <video
        key={currentQuestion}
          // src={`https://your-database-url/video${currentQuestion + 1}.mp4`}
          controls
          className="w-full aspect-video rounded-lg shadow-lg"
        >   <source src={questions[currentQuestion].vdo} type="video/mp4" /> </video>

        {/* ปุ่มตอบ */}
        <div className="flex gap-10 mt-4 justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleAnswer(true)}
            className="flex flex-col items-center text-green-500"
          >
            <CheckCircle size={80} />
            <span className="mt-1 text-base font-bold">ผ่าน</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleAnswer(false)}
            className="flex flex-col items-center text-red-500"
          >
            <XCircle size={80} />
            <span className="mt-1 text-base font-bold">ไม่ผ่าน</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
