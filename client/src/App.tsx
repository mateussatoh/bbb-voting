"use client";
import { PieGraphCard } from "@/components/PieGraphCard";
import { HorizontalBarGraphCard } from "@/components/HorizontalBarGraphCard";

function App() {
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
