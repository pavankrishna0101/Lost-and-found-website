import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import ItemDetails from "./pages/itemDetail";

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:productId" element={<ItemDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;