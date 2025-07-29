"use client";

import { create } from "domain";
import { createContext, useEffect, useState } from "react";
import { Game, game1, game2, game3, game4 } from "@/app/Types/game.types";
import { defaultGameData } from "@/app/Constants/Game/game.constants";
import { p } from "framer-motion/client";
import { Setting, SidePro, Vdo } from "@/app/Types/TypesTest/setting.types";
import { settingConstants } from "@/app/Constants/Game/setting/setting.constants";
import { config } from "@/app/Config/config";
export const GameContext = createContext<
  | {
      gameData: Game;
      setting: Setting[] | null;
      selectSetting: Setting | null;
      game1: SidePro | null;
      game2: SidePro | null;
      game3: SidePro | null;
      SetVdoGame3: (vdo: Vdo[]) => void;
      gamevdo3: Vdo[] | null;
      game4: SidePro | null;
      updateAge: (age: string) => void;
      updatestudenID: (studenID: string) => void;
      updateScore: () => void;
      SelectSetting: (Setting: Setting) => void;
      updateGame1: (game1: game1) => void;
      updateGame2: (game2: game2) => void;
      updateGame3: (game3: game3) => void;
      updateGame4: (game4: game4) => void;
      setdefault: () => void;
    }
  | undefined
>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameData, setgameData] = useState<Game>(defaultGameData);

  // ------------------------------ setting ---------------------------------------
  const [setting, setSetting] = useState<Setting[] | null>(null);
  const [selectSetting, setSelectSetting] = useState<Setting | null>(null);
  const [game1, setGame1] = useState<SidePro | null>(null);
  const [game2, setGame2] = useState<SidePro | null>(null);
  const [game3, setGame3] = useState<SidePro | null>(null);
  const [gamevdo3, setGamevdo3] = useState<Vdo[] | []>([]);
  const [game4, setGame4] = useState<SidePro | null>(null);
  const [loadSetting, setLoadSetting] = useState<boolean>(false);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("data setting:", selectSetting);
  }, [selectSetting]);

  const fetchData = async () => {
    try {
      setLoadSetting(true);
      const response = await fetch(config.url + "game/");
      if (response.ok) {
        const res = await response.json();
        setSetting(res);
      }
    } catch (error) {}
  };

  const SelectSetting = async (Setting: Setting) => {
    setSelectSetting(Setting);

    Setting.SidePro.map((value) => {
      if (value.Name === "1") {
        setGame1(value);
      } else if (value.Name === "2") {
        setGame2(value);
      } else if (value.Name === "3") {
        setGame3(value);
      } else if (value.Name === "4") {
        setGame4(value);
      }
    });
  };

  const SetVdoGame3 = (vdo: Vdo[]) => {
    if (vdo) {
      setGamevdo3(vdo);
    }
  };

  // ------------------------------- setting --------------------------------------
  const setdefault = () => {
    setgameData(defaultGameData);
  };

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

  // const updateGame1 = (game1: any) => {
  //   setgameData((prev) => ({
  //     ...prev,
  //     gamedetail: {
  //       ...prev.gamedetail,
  //       game1: prev.gamedetail.game1.map((item) => {
  //         return {
  //           ...item,
  //           game1,
  //         };
  //       }),
  //     },
  //   }));
  // };

  const updateGame1 = (answer: game1) => {
    setgameData((prev) => ({
      ...prev,
      gamedetail: {
        ...prev.gamedetail,
        game1: [...prev.gamedetail.game1, answer], // ✅ เพิ่มคำตอบใหม่เข้าไปใน array
      },
    }));
  };

  const updateGame2 = (answer: game2) => {
    setgameData((prev) => ({
      ...prev,
      gamedetail: {
        ...prev.gamedetail,
        game2: [...prev.gamedetail.game2, answer], // ✅ เพิ่มคำตอบใหม่เข้าไปใน array
      },
    }));
  };

  const updateGame3 = (answer: game3) => {
    setgameData((prev) => ({
      ...prev,
      gamedetail: {
        ...prev.gamedetail,
        game3: [...prev.gamedetail.game3, answer], // ✅ เพิ่มคำตอบใหม่เข้าไปใน array
      },
    }));
  };

  const updateGame4 = (answer: game4) => {
    setgameData((prev) => ({
      ...prev,
      gamedetail: {
        ...prev.gamedetail,
        game4: [...prev.gamedetail.game4, answer], // ✅ เพิ่มคำตอบใหม่เข้าไปใน array
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
      value={{
        gameData,
        updateAge,
        updatestudenID,
        updateScore,
        SelectSetting,
        updateGame1,
        updateGame2,
        updateGame3,
        updateGame4,
        setdefault,
        selectSetting,
        setting,
        game1,
        game2,
        game3,
        game4,
        SetVdoGame3,
        gamevdo3,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
