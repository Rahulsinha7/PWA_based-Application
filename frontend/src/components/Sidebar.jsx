import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-yellow-100 shadow-lg flex-col">
      <div className="flex flex-col items-center justify-center p-6 bg-yellow-200">
        <h1 className="text-xl font-bold">DreamSprint</h1>
        {user && (
          <span className="text-sm font-medium text-gray-700 mt-1">
            Hello, {user.firstName}
          </span>
        )}

        <button
          onClick={logout}
          className="mt-3 text-xs text-red-600 hover:text-red-800 underline transition"
        >
          Logout
        </button>
      </div>

      <nav className="flex flex-col gap-2 mt-6 px-2">
        <a
          href="#mytask"
          className="text-center font-semibold text-gray-800 hover:bg-yellow-200 py-3 rounded-lg transition"
        >
          Tasks
        </a>
        <a
          href="#achieve"
          className="text-center font-semibold text-gray-800 hover:bg-yellow-200 py-3 rounded-lg transition"
        >
          Achievements
        </a>
      </nav>
    </aside>
  );
}
