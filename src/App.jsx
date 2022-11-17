
import Addrecipe from "./Component/Addrecipe";
import Viewrecipe from "./Component/Viewrecipe";
import RecipesDetails from "./Component/RecipesDetails";
import Editrecipe from "./Component/Editrecipe";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Addrecipe />} />
        <Route path="viewrecipe" element={<Viewrecipe />} />
        <Route path="recipesdetails/:id" element={<RecipesDetails />} />
        <Route path="editrecipe/:id" element={<Editrecipe />} />
      </Routes>
    </div>
  );
}

export default App;
