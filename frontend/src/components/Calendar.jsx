import { useState } from "react";

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  return (
    <section className="mt-10 flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full md:w-3/4">
        <div className="flex justify-between mb-4 font-bold">
          <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>
            Prev
          </button>
          <span>
            {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
          </span>
          <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {[...Array(days)].map((_, i) => (
            <div
              key={i}
              className="p-2 bg-gray-100 text-center rounded hover:bg-gray-300 cursor-pointer"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
