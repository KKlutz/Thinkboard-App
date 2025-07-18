import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";

import api from "../lib/axios.api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const NoteDetail = () => {
  const location = useLocation();
  // Simple way to set initial value of each properties
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  // The other way
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [noteUpdated, setNoteUpdated] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // fetch note on the first mounting also when the id changed
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.note);
      } catch (error) {
        console.error("Error fetching note", error);
        toast.error("Failed to fetch note.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Input Handler function
  const handlerChange = (e, name) => {
    setNote({ ...note, [name]: e.target.value });
  };

  // Update function
  const updateNote = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setNoteUpdated(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully.");
      navigate("/home");
    } catch (error) {
      console.error("Error updating note: ", error);

      if (error.response.status === 429) {
        toast.error("Hey, please slow down.", { icon: "🫵" });
      } else {
        toast.error("Failed to update note.");
      }
    } finally {
      setNoteUpdated(false);
    }
  };

  return (
    <main className="relative z-99 min-h-screen">
      {isLoading && (
        <div className="min-h-screen flex flex-col justify-center items-center gap-y-2">
          <Loader />
          <span className="text-center text-base tracking-wide">Loading</span>
        </div>
      )}

      {!isLoading && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link
              to={location.state?.from ? `/home${location.state.from.search}` : "/home"}
              className="btn btn-ghost mb-6 text-base"
            >
              <ArrowLeftIcon className="size-5 mt-[0.15rem]" />
              <span>Back to Notes</span>
            </Link>
            <div className="card bg-base-200">
              <div className="card-body">
                <form onSubmit={(e) => updateNote(e)}>
                  <div className="form-control mb-4">
                    <label htmlFor="title" className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input input-bordered rounded-2xl text-sm"
                      value={note.title}
                      onChange={(e) => handlerChange(e, e.target.name)}
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label htmlFor="content" className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      className="textarea textarea-bordered rounded-2xl h-32"
                      value={note.content}
                      onChange={(e) => handlerChange(e, e.target.name)}
                    ></textarea>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      type="submit"
                      className="btn btn-accent rounded-2xl mt-4"
                      disabled={noteUpdated}
                    >
                      {noteUpdated ? "Updating..." : "Update Note"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default NoteDetail;
