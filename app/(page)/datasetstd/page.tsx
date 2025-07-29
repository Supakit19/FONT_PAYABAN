"use client";

import { GameContext } from "@/app/Contexts/Game/game.context";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const isValidStudentID = (id: string): boolean => {
  const validPrefixes = ["650", "660", "670", "680", "690"];
  const trimmedId = id.trim();

  // เช็คเลข 8 หลัก
  if (!/^\d{8}$/.test(trimmedId)) return false;

 
  return validPrefixes.some((prefix) => trimmedId.startsWith(prefix));
};

export default function HomeDatasetStd() {
  const router = useRouter();
  const [studentId, setStudentId] = useState("");
  const context = useContext(GameContext);

  const handleStudentIdUpdate = (id: string) => {
    if (context && context.updatestudenID) {
      context.updatestudenID(id);
    }
  };

  const handleNavigate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidStudentID(studentId)) {
      await Swal.fire({
        icon: "error",
        title: "⛔ รหัสไม่ถูกต้อง",
        text: "กรุณากรอกรหัสให้ถูกต้อง",
        confirmButtonColor: "#f87171",
        confirmButtonText: "ลองใหม่",
        background: "#fff8fa",
        customClass: {
          popup: "rounded-2xl shadow-xl",
          title: "font-mali text-xl text-red-600",
          htmlContainer: "text-base text-gray-800 font-mali",
          confirmButton: "rounded-full px-6 py-2 font-mali",
        },
      });
      return;
    }

    handleStudentIdUpdate(studentId);
    router.push(`/home1`);
  };

  return (
    <>
      <div
        className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-red-100 via-white to-red-50 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/img/background.jfif')" }}
      >
        <div className="relative z-10 text-center"></div>
        <h1 className="font-mali text-4xl md:text-5xl lg:text-6xl font-extrabold text-red-600 mb-6 drop-shadow-lg animate-fade-in">
          หนูน้อยพัฒนาการสมวัย
        </h1>
        <div className="flex flex-col items-center gap-10 mt-8">
          <form
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col items-center gap-6 w-full max-w-md transform transition-all hover:scale-105"
            onSubmit={handleNavigate}
          >
            <label
              htmlFor="studentId"
              className="font-mali text-xl text-red-700 font-semibold"
            >
              รหัสนิสิต
            </label>
            <input
              id="studentId"
              type="text"
              placeholder="กรอกรหัสนิสิตของคุณ"
              className="border border-red-300 rounded-lg px-5 py-3 w-full max-w-xs focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500 font-mali text-gray-800 placeholder-gray-400 transition duration-300"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
            <motion.button
              whileHover={{ scale: 1.1, rotate: -3 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className=""
            >
              <motion.img
                src="/img/play.png"
                alt="play button"
                className="w-32 drop-shadow-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              />
            </motion.button>
          </form>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </>
  );
}
