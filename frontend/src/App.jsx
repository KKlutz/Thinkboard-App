import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import api from "../lib/axios.api.js";

const App = () => {
  console.log("isi :::::: ....");
  console.log(api.get("/notes"));
  return (
    <div className="relative size-full">
      <div class="absolute size-full -z-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_25%_18%_at_50%_-20%,#000_10%,transparent_200%)] md:[mask-image:radial-gradient(ellipse_25%_25%_at_50%_-20%,#000_10%,transparent_200%)]" />

      <div className="absolute inset-0 -z-10 size-full items-center px-5 py-24 [background:radial-gradient(130%_130%_at_50%_10%,#181818_70%,#ea6947_140%)]" />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
};

export default App;
