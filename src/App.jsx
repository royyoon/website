import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import ArticleDetail from "./pages/ArticleDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:id" element={<ArticleDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
