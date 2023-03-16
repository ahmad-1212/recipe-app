import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Navigate to="/recipes" />} />
      <Route path="/recipes" element={<Home />} />
      <Route path="/recipes/:recipeId" element={<Detail />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  </Layout>
);

export default App;
