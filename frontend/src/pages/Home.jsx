import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

import api from "../lib/axios.api.js";
import Navbar from "../components/Navbar.jsx";
import RateLimited from "../components/RateLimited.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NotesEmpty from "../components/NotesEmpty.jsx";
import Jumbotron from "../components/Jumbotron.jsx";
import Pagination from "../components/Pagination.jsx";

const Home = () => {
  const [queryParams, setQueryParams] = useSearchParams();

  const orderBy = queryParams.get("order") || "desc";
  const limitPage = parseInt(queryParams.get("limit")) || 6;
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);

  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch notes on the first mounting (render)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Get data API with fetch()
        // const res = await fetch("http://localhost:5050/api/notes", { method: "GET" });
        // const data = await res.json();

        // Get data API with Axios
        const res = await api.get("/notes", {
          params: {
            order: orderBy,
            limit: limitPage,
            page: currentPage,
          },
        });

        setNotes(res.data.notes);
        setTotalPages(res.data.totalPages);

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
  }, [currentPage]);

  const handlerPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setQueryParams({ page: newPage });
  };

  return (
    <main className="relative z-99 min-h-screen ">
      <div className="mx-4"></div>
      <Navbar />
      {isRateLimit ? <RateLimited /> : null}

      <div className="max-w-6xl mx-auto p-4 mt-5 ">
        {!isRateLimit && <Jumbotron />}

        {isLoading && <div className="text-center text-base mt-10">Loading notes ...</div>}

        {!isLoading && notes?.length === 0 && !isRateLimit && <NotesEmpty />}

        {!isLoading && notes?.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

        {!isRateLimit && !isLoading && notes?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePages={handlerPageChange}
          />
        )}
      </div>
    </main>
  );
};

export default Home;
