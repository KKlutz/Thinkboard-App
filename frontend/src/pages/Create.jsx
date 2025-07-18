import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

import api from "../lib/axios.api.js";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteCreated, setNoteCreated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const submitNote = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setNoteCreated(true);

    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully ✨");
      navigate("/home");
    } catch (error) {
      console.error("Error creating note: ", error);

      if (error.response.status === 429) {
        toast.error("Hey, please slow down.", { icon: "🫵" });
      } else {
        toast.error("Failed to create note.");
      }
    } finally {
      setNoteCreated(false);
    }
  };

  return (
    <main className="relative z-99 min-h-screen">
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
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={(e) => submitNote(e)}>
                <div className="form-control mb-4">
                  <label className="label" htmlFor="title">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered rounded-2xl text-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label htmlFor="content" className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    id="content"
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered rounded-2xl h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                <div className="card-actions justify-end ">
                  <button
                    type="submit"
                    className="btn btn-accent rounded-2xl mt-4"
                    disabled={noteCreated}
                  >
                    {noteCreated ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Create;
