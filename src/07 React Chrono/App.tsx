import { useRef, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

function formatTime(tenths: number) {
  const mins = Math.floor(tenths / 600);
  const secs = Math.floor((tenths % 600) / 10);
  const t = tenths % 10;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${t}`;
}

export default function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handlePlayPause() {
    if (running) {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      setRunning(false);
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 100);
      setRunning(true);
    }
  }

  function handleStop() {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setRunning(false);
    setTime(0);
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-dvh bg-gray-100 p-4">
      <div className="flex flex-col gap-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center">Chrono</h1>

        <div className="rounded-2xl shadow-2xl bg-gray-200 p-12 flex flex-col gap-12">
          <div className="text-center text-4xl font-mono">{formatTime(time)}</div>

          <div className="flex gap-8 justify-center">
            <button
              aria-label={running ? "Pause" : "Play"}
              onClick={handlePlayPause}
              className="cursor-pointer hover:scale-110 transition-transform"
            >
              {running ? <FaPause className="size-8" /> : <FaPlay className="size-8" />}
            </button>
            <button
              aria-label="Stop"
              onClick={handleStop}
              className="cursor-pointer hover:scale-110 transition-transform"
            >
              <FaStop className="size-8" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
