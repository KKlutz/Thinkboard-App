import { useLocation, Link } from "react-router";
import { Trash2, SquarePen } from "lucide-react";
import toast from "react-hot-toast";

import { formatDate } from "../lib/utils";
import api from "../lib/axios.api.js";

const NoteCard = ({ note, setNotes }) => {
  const location = useLocation();

  // Delete function
  const handlerDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully.");
    } catch (error) {
      console.error("Error delete note: ", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      state={{ from: location }}
      className="card bg-base-200 hover:shadow-xl transition-all duration-150 border-t-2 border-solid border-accent"
    >
      <div className="card-body gap-3">
        <h2 className="card-title text-base-content">{note.title}</h2>
        <p className="text-sm line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <p className="text-xs text-base-content/50">{formatDate(note.updatedAt)}</p>
          <div className="flex flex-row items-center">
            <button className="btn btn-ghost btn-xs px-1">
              <SquarePen className="size-4 text-base-content/50" />
            </button>
            <button
              className="btn btn-ghost btn-xs px-1 text-error"
              onClick={(e) => handlerDelete(e, note._id)}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
