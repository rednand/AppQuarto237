import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Exclusao from "./pages/Exclusao";
import Home from "./pages/Home";
import "./index";
const imageFilePath = "./assets/imagens/main.png";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Exclusao />} path="/buscar"></Route>
        <Route element={<Cadastro />} path="/cadastro"></Route>
      </Routes>
    </Router>
  );
};

export default App;
