import { Link } from "react-router";
import { Plus } from "lucide-react";
import { useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  return (
    <header className="bg-base-300 border-b-2 border-base-content/20">
      <div className="mx-auto max-w-6xl p-4">
        <nav className="flex items-center justify-between">
          <h1 className="font-mono font-bold text-2xl text-accent">Thinkboard</h1>
          <Link to="/create" state={{ from: location }}>
            <button className="btn btn-accent btn-outline rounded-full">
              <Plus />
              <span>New Note</span>
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
