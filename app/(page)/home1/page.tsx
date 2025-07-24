"use client";

import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";

export default function HomeStartPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const context = useContext(GameContext);
  const children = [
    { name: "เด็ก 1", img: "baby1.jpg", age: 9 },
    { name: "เด็ก 2", img: "baby2.jpg", age: 18 },
    { name: "เด็ก 3", img: "baby3.jpg", age: 30 },
    { name: "เด็ก 4", img: "baby4.jpg", age: 42 },
    { name: "เด็ก 5", img: "baby5.jpg", age: 60 },
  ];

  const handleAgeUpdate = (age: string) => {
    if (context && context.updateAge) {
      context.updateAge(age);
    }
  };

  const handleNext = () => {
    if (selected !== null) {
      const child = children[selected];

      // router.push(`/game1?name=${child.name}&age=${child.age}`);
      router.push(`/step1`);
    } else {
      alert("กรุณาเลือกเด็กก่อนเริ่มประเมิน");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('/img/background.jfif')",
      }}
    >
      <div className="font-mali text-red-600 text-2xl md:text-4xl font-bold mb-6 drop-shadow-md px-6 py-4 rounded-2xl border-4 border-pink-400 bg-white/80 shadow-lg text-center">
        ประเมินใครดี?
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {children.slice(0, 3).map((child, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.1, rotate: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelected(idx);
              handleAgeUpdate(child.age.toString());
            }}
            className={`mt-6 p-1 rounded-2xl ${
              selected === idx ? "ring-4 ring-green-400" : ""
            }`}
          >
            <motion.img
              src={`/img/${child.img}`}
              alt={child.name}
              style={{ width: "200px", height: "200px" }}
              className="drop-shadow-xl bg-white rounded-2xl object-cover"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            />
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {children.slice(3).map((child, idx) => {
          const realIdx = idx + 3;
          return (
            <motion.button
              key={realIdx}
              whileHover={{ scale: 1.1, rotate: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSelected(realIdx);
                handleAgeUpdate(child.age.toString());
              }}
              className={`mt-6 p-1 rounded-2xl ${
                selected === realIdx ? "ring-4 ring-green-400" : ""
              }`}
            >
              <motion.img
                src={`/img/${child.img}`}
                alt={child.name}
                style={{ width: "200px", height: "200px" }}
                className="drop-shadow-xl bg-white rounded-2xl object-cover"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
          );
        })}
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNext}
        className=""
      >
        <div className="relative inline-block pt-4 mt-8">
          <div className="relative bg-[#c6d9f8] border-4 border-[#5c9ded] text-white font-bold pl-5 pr-10  rounded-md text-lg font-mali">
            NEXT
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-13 h-13 rounded-full bg-[#c6d9f8] flex items-center justify-center border-4 border-[#5c9ded]">
              <FaAngleDoubleRight className="text-white text-base" />
            </div>
          </div>
        </div>
      </motion.button>
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNext}
        className="mt-10"
      >
        <motion.img
          src="/img/next1.png"
          alt="next button"
          className="w-28 md:w-32 drop-shadow-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </motion.button> */}
    </div>
  );
}
