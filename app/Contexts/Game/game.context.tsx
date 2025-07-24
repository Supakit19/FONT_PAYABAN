"use client";

import { create } from "domain";
import { createContext, useEffect, useState } from "react";
import { Game, game1 } from "@/app/Types/game.types";
import { defaultGameData } from "@/app/Constants/Game/game.constants";
import { p } from "framer-motion/client";
export const GameContext = createContext<
  | {
      gameData: Game;
      updateAge: (age: string) => void;
      updatestudenID: (studenID: string) => void;
      updateScore: () => void;
    }
  | undefined
>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameData, setgameData] = useState<Game>(defaultGameData);
  const updatestudenID = (studenID: string) => {
    setgameData((prev) => ({
      ...prev, // ข้อมูลเกมก่อนหน้ายยังอยู่เหมือนเดิม ถ้าไม่มี...prev จะลบข้อมูลเก่าออก
      studenID: studenID, // แต่ตรงนี้จะอัพเดต studenID ใหม่
    }));
  };

  const updateAge = (age: string) => {
    setgameData((prev) => ({
      ...prev,
      age: age, // อัพเดตอายุใหม่
    }));
  };

  const updateScore = () => {
    setgameData((prev) => ({
      ...prev,
      score: gameData.score + 1, // อัพเดตคะแนนใหม่
    }));
  };

  const updateGame1 = (game1: any) => {
    setgameData((prev) => ({
      ...prev,
      gamedetail: {
        ...prev.gamedetail,
        game1: prev.gamedetail.game1.map((item) => {
          return {
            ...item,
            game1,
          };
        }),
      },
    }));
  };

  const updateGame2 = (game2: any) => {
    setgameData((prev) => ({
      ...prev,
      gamedetail: {
        ...prev.gamedetail,
        game2: prev.gamedetail.game2.map((item) => {
          return {
            ...item,
            game2,
          };
        }),
      },
    }));
  };

  const updateGame3 = (game3: any) => {
    setgameData((prev) => ({
      ...prev,
      gamedetail: {
        ...prev.gamedetail,
        game3: prev.gamedetail.game3.map((item) => {
          return {
            ...item,
            game3,
          };
        }),
      },
    }));
  };

  const updateGame4 = (game4: any) => {
    setgameData((prev) => ({
      ...prev,
      gamedetail: {
        ...prev.gamedetail,
        game4: prev.gamedetail.game4.map((item) => {
          return {
            ...item,
            game4,
          };
        }),
      },
    }));
  };

  useEffect(() => {
    console.log("Game data updated:", gameData);
    // คุณสามารถทำการบันทึกข้อมูลเกมที่นี่ถ้าต้องการ
    // เช่น บันทึกลง localStorage หรือส่งไปยัง API
  }, [gameData]);

  return (
    <GameContext.Provider
      value={{ gameData, updateAge, updatestudenID, updateScore }}
    >
      {children}
    </GameContext.Provider>
  );
}
