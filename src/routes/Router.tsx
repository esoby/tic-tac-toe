import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Setting from "../pages/Setting";
import Game from "../pages/Game";
import History from "../pages/History";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/game" element={<Game />} />
      <Route path="/history" element={<History />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}
