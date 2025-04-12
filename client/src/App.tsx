"use client";
import { PieGraphCard } from "@/components/PieGraphCard";
import { HorizontalBarGraphCard } from "@/components/HorizontalBarGraphCard";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export interface CandidateVotes {
  candidateId: string;
  votes: number;
}

function App() {
  const [results, setResults] = useState<CandidateVotes[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("votes", (votes) => {
      const results = Object.entries(votes).map(([candidateId, votes]) => ({
        candidateId,
        votes,
      })) as CandidateVotes[];

      setResults(results);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="flex flex-row h-screen gap-4 p-4">
        <div className="w-1/2 height-full">
          <PieGraphCard data={results} />
        </div>
        <div className="w-1/2 height-full">
          <HorizontalBarGraphCard data={results} />
        </div>
      </div>
    </div>
  );
}

export default App;
