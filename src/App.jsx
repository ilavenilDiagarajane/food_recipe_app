import { useState } from "react";
import Addrecipe from "./Component/Addrecipe";
import Viewrecipe from "./Component/Viewrecipe";
import RecipesDetails from "./Component/RecipesDetails";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Addrecipe />} />
        <Route path="viewrecipes" element={<Viewrecipe />} />
        <Route path="recipesdetails/:id" element={<RecipesDetails />} />
      </Routes>
    </div>
  );
}

export default App;
