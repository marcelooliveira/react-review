import { useRef, useState } from "react";

type WikiApiResponse = [string, string[], string[], string[]];
type Term = { term: string; time: Date };
type Result = { title: string; url: string };

export default function App() {
  const [results, setResults] = useState<Result[]>([]);
  const [history, setHistory] = useState<Term[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const term = inputRef.current!.value.trim();
    if (!term) return;

    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(term)}&format=json&origin=*`
    );
    const data: WikiApiResponse = await res.json();
    const titles = data[1];
    const urls = data[3];
    setResults(titles.map((title, i) => ({ title, url: urls[i] })));

    setHistory((prev) => {
      const filtered = prev.filter((h) => h.term !== term);
      return [...filtered, { term, time: new Date() }].slice(-5);
    });

    inputRef.current!.value = "";
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh bg-gray-100 p-4">
      <div className="flex flex-col gap-8 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-gray-700">Wiki fetching</h1>

        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl shadow-md flex flex-col border border-neutral-200"
        >
          <label
            htmlFor="search"
            className="text-xl font-medium text-gray-600 mb-2"
          >
            Search:
          </label>

          <div className="flex">
            <input
              ref={inputRef}
              id="search"
              className="grow font-light rounded-l-lg border-gray-300 border px-4 py-2"
            />

            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-r-lg hover:bg-teal-600 transition-colors cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="grid grid-cols-2 gap-8 border p-8 border-neutral-200 rounded-2xl shadow-md min-h-96">
          <div>
            <h2 className="text-2xl mb-4">Results</h2>

            <ul>
              {results.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    className="underline text-blue-500 hover:text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl mb-4">Last 5 terms</h2>

            <ul>
              {history.map((h) => (
                <li key={h.term} className="gap-2 flex">
                  <span className="font-medium">{h.term}</span>
                  <span className="font-light">{h.time.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
