export default function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-yellow-100 shadow-lg flex-col">
      <div className="h-24 flex items-center justify-center bg-yellow-200 text-xl font-bold">
        DreamSprint
      </div>

      <nav className="flex flex-col gap-4 mt-8">
        <a href="#mytask" className="text-center font-semibold hover:bg-yellow-200 py-2">
          Tasks
        </a>
        <a href="#achieve" className="text-center font-semibold hover:bg-yellow-200 py-2">
          Achievements
        </a>
      </nav>
    </aside>
  );
}
