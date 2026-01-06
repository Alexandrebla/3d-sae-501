import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Salle from "./pages/Salle";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salle" element={<Salle />} />
      </Routes>
    </BrowserRouter>
  );
}
