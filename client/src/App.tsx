"use client";
import { PieGraphCard } from "@/components/PieGraphCard";
import { HorizontalBarGraphCard } from "@/components/HorizontalBarGraphCard";
import { io } from "socket.io-client";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("votes", (votes) => {
      console.log("Votos atualizados:", votes);
    });

    return () => {
      socket.disconnect();
    };
  }, []); // <-- GARANTA que tenha esse array vazio!
  return (
    <div className="flex h-screen flex-col gap-4 p-4">
      <div className="w-1/2">
        <PieGraphCard />
      </div>
      <div className="w-1/2">
        <HorizontalBarGraphCard />
      </div>
    </div>
  );
}

export default App;
