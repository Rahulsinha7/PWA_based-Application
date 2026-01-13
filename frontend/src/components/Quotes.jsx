import { useEffect, useState } from "react";

const quotes = [
  "Time is what we want most, but use worst.",
  "Lost time is never found again.",
  "The bad news is time flies. The good news is you're the pilot."
];

export default function Quotes() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const show = () =>
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    show();
    const i = setInterval(show, 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <footer className="fixed bottom-0 w-full bg-indigo-600 text-white text-center py-2 italic font-bold">
      {quote}
    </footer>
  );
}
