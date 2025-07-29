"use client";

import React, { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { GameContext } from "@/app/Contexts/Game/game.context";

export default function GameGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const context = useContext(GameContext);

  useEffect(() => {
    const gameData = context?.gameData;

    if (!gameData) return;

    if (gameData.studenID === "") {
      context?.setdefault?.();
      router.push("/");
    }
  }, [context?.gameData]);

  return <>{children}</>;
}
