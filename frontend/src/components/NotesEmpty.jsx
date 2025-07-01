import { Notebook } from "lucide-react";
import { Link } from "react-router";

const NotesEmpty = () => {
  return (
    <div className="card relative z-99">
      <div className="card-body justify-center items-center text-center rounded-sm max-w-md mx-auto space-y-6">
        <div className="bg-accent/10 rounded-full p-8">
          <Notebook className="size-10 text-accent/70" />
        </div>
        <h2 className="text-2xl font-bold text-base-content/70">It's quite empty here...</h2>
        <p className="text-base-content/70">
          Mind share your thoughts? Let's create your first note to get started on your journey.
        </p>
        <Link to="/create" className="underline underline-offset-8 text-base-content/70">
          Create new note
        </Link>
      </div>
    </div>
  );
};

export default NotesEmpty;
