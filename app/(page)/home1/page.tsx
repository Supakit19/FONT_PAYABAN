"use client";

import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import { GameContext } from "@/app/Contexts/Game/game.context";
import { Setting } from "@/app/Types/TypesTest/setting.types";
import { config } from "@/app/Config/config";
import GameGuard from "@/app/components/GameGuard";

export default function HomeStartPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Setting | null>(null);
  const context = useContext(GameContext);
  const [setting, setSetting] = useState<Setting[] | null>(null);

  useEffect(() => {
    if (context?.setting) {
      setSetting(context.setting);
    }
  }, [context]);

  const handleAgeUpdate = (age: string) => {
    if (context?.updateAge) {
      context.updateAge(age);
    }
  };

  const handleNext = () => {
    if (selected !== null) {
      context?.SelectSetting(selected);
      router.push(`/step1`);
    } else {
      alert("กรุณาเลือกเด็กก่อนเริ่มประเมิน");
    }
  };

  // ✅ ตรวจสอบว่า context พร้อมไหม (ป้องกัน error จาก context null)
  if (!context || !context.setting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 font-bold text-lg">
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  return (
    <GameGuard>
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-4"
        style={{ backgroundImage: "url('/img/background.jfif')" }}
      >
        <div className="font-mali text-red-600 text-2xl md:text-4xl font-bold mb-6 drop-shadow-md px-6 py-4 rounded-2xl border-4 border-pink-400 bg-white/80 shadow-lg text-center">
          ประเมินใครดี?
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {setting?.map((child, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.1, rotate: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSelected(child);
                handleAgeUpdate(child.age.toString());
              }}
              className={`mt-6 p-1 rounded-2xl ${
                selected?.DataSet_id === child.DataSet_id
                  ? "ring-4 ring-green-400"
                  : ""
              }`}
            >
              <motion.img
                src={`${config.image}${child.banner}`}
                alt={child.age}
                style={{ width: "200px", height: "200px" }}
                className="drop-shadow-xl bg-white rounded-2xl object-cover"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
        >
          <div className="relative inline-block pt-4 mt-8">
            <div className="relative bg-[#c6d9f8] border-4 border-[#5c9ded] text-white font-bold pl-5 pr-10 rounded-md text-lg font-mali">
              NEXT
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-13 h-13 rounded-full bg-[#c6d9f8] flex items-center justify-center border-4 border-[#5c9ded]">
                <FaAngleDoubleRight className="text-white text-base" />
              </div>
            </div>
          </div>
        </motion.button>
      </div>
    </GameGuard>
  );
}
