import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../lib/axios.api.js";
import Navbar from "../components/Navbar.jsx";
import RateLimited from "../components/RateLimited.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NotesEmpty from "../components/NotesEmpty.jsx";
import Jumbotron from "../components/Jumbotron.jsx";

const Home = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("isi : ....");
  console.log(api.get("/notes"));
  // fetch notes on the first mounting (render)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Get data API with fetch()
        // const res = await fetch("http://localhost:5050/api/notes", { method: "GET" });
        // const data = await res.json();

        // Get data API with Axios
        const res = await api.get("/notes");

        setNotes(res.data.notes);
        setIsRateLimit(false);
      } catch (error) {
        console.error("Error fetch notes: ", error);
        if (error.response.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error("Failed load notes.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <main className="relative z-99 min-h-screen ">
      <div className="mx-4"></div>
      <Navbar />
      {isRateLimit ? <RateLimited /> : null}

      <div className="max-w-6xl mx-auto p-4 mt-5 ">
        {!isRateLimit && <Jumbotron />}

        {isLoading && <div className="text-center text-base mt-10">Loading notes ...</div>}

        {!isLoading && notes.length === 0 && !isRateLimit && <NotesEmpty />}

        {!isLoading && notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
