import { FaPlay, FaStop } from "react-icons/fa";
// import {FaPause} from "react-icons/fa";

export default function App() {
  return (
    <main className="flex flex-col justify-center items-center min-h-dvh bg-gray-100 p-4">
      <div className="flex flex-col gap-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center">Chrono</h1>

        <div className="rounded-2xl shadow-2xl bg-gray-200 p-12 flex flex-col gap-12">
          <div className="text-center text-4xl font-mono">00:00.0</div>

          <div className="flex gap-8 justify-center">
            <button className="cursor-pointer hover:scale-110 transition-transform">
              <FaPlay className="size-8" />
            </button>
            <button className="cursor-pointer hover:scale-110 transition-transform">
              <FaStop className="size-8" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
