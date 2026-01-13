import { useEffect, useState } from "react";
import axiosClient from "../axios/axiosClient";

export default function GoalManager() {
  const [goal, setGoal] = useState("");
  const [priority, setPriority] = useState("Must Do");
  const [date, setDate] = useState("");
  const [goals, setGoals] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  

  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await axiosClient.get("/goals");
      setGoals(res.data);
    } catch (err) {
      if (!navigator.onLine) {
        console.log("Offline mode: using cached goals");
        


      } else {
        console.error("Fetch goals error:", err);
      }
    }
  };

  const addGoal = async () => {
    if (!goal) return alert("Enter a goal");

    const data = {
      title: goal,
      priority,
      targetDate: date,
    };

    
    if (!navigator.onLine) {
      const offlineGoals =
        JSON.parse(localStorage.getItem("offlineGoals")) || [];
      offlineGoals.push(data);
      localStorage.setItem("offlineGoals", JSON.stringify(offlineGoals));

      alert("You are offline. Goal saved and will sync when online.");
      setGoal("");
      setDate("");
      return;
    }

    try {
      await axiosClient.post("/goals", data);
      setGoal("");
      setDate("");
      fetchGoals();
    } catch (err) {
      console.error("Create goal error:", err);
    }
  };

  const completeGoal = async (id) => {
    try {
      await axiosClient.put(`/goals/${id}`, {
        completed: true,
      });
      fetchGoals();
    } catch (err) {
      console.error("Update goal error:", err);
    }
  };

 
  useEffect(() => {
    const syncOfflineGoals = async () => {
      const offlineGoals =
        JSON.parse(localStorage.getItem("offlineGoals")) || [];

      if (offlineGoals.length && navigator.onLine) {
        for (const g of offlineGoals) {
          await axiosClient.post("/goals", g);
        }
        localStorage.removeItem("offlineGoals");
        fetchGoals();
      }
    };

    window.addEventListener("online", syncOfflineGoals);
    return () => window.removeEventListener("online", syncOfflineGoals);
  }, []);

  return (
    <section id="mytask">
     
      <div className="bg-pink-400 text-white rounded-xl p-4 text-center shadow-md">
        <h2 className="text-xl font-bold">DreamSprint by Rahul</h2>
        <p>Craft Your Dreams, Conquer your Goals</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
      
        <div className="md:col-span-2 bg-blue-200 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold mb-3">Create New Goal</h3>

          <input
            className="w-full p-2 rounded mb-3"
            placeholder="Enter your goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <select
            className="w-full p-2 rounded mb-3"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Must Do</option>
            <option>Important</option>
            <option>Optional</option>
          </select>

          <input
            type="date"
            className="w-full p-2 rounded mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            onClick={addGoal}
            className="w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600"
          >
            Make It Happen
          </button>
        </div>

       
        <div className="bg-yellow-100 p-6 rounded-xl shadow-md ">
         

          <h3 className="font-bold mb-3 ">Active Goals</h3>

          {goals
            .filter((g) => !g.completed)
            .map((g) => (
              <div
                key={g._id}
                className="flex items-center gap-2 mb-2"
              >
                <input
                  type="checkbox"
                  onChange={() => completeGoal(g._id)}
                />
                <span>{g.title}</span>
              </div>
            ))}
        </div>
      </div>

      <div
        id="achieve"
        className="mt-6 bg-green-200 p-4 rounded-xl shadow-md">
        <h3 className="font-bold mb-2">Completed Goals</h3>

        {goals
          .filter((g) => g.completed)
          .map((g) => (
            <p key={g._id}>✔ {g.title}</p>
          ))}
      </div>
    </section>
  );
}
