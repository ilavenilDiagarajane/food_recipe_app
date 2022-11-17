import Home from "./Component/Home";
import Addrecipe from "./Component/Addrecipe";
import Viewrecipe from "./Component/Viewrecipe";
import RecipesDetails from "./Component/RecipesDetails";
import Editrecipe from "./Component/Editrecipe";
import "./App.css";
import { Routes, Route,NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from "./images/logo.png";

function App() {
  return (
    <div className="App">
        <Navbar>
      <Container>
      <img
              src={logo}
              
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
        <Navbar.Brand className="logo">Chef Book</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-5 ">
          <Navbar.Text>
          <NavLink to="addrecipe"  className="link">
            
              Add Recipe
            </NavLink>
          
          </Navbar.Text>
          <Navbar.Text>
          <NavLink to="viewrecipe" className="link">
            
            View Recipe
          </NavLink>
          </Navbar.Text>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="addrecipe" element={<Addrecipe />} />
        <Route path="viewrecipe" element={<Viewrecipe />} />
        <Route path="recipesdetails/:id" element={<RecipesDetails />} />
        <Route path="editrecipe/:id" element={<Editrecipe />} />
      </Routes>
    </div>
  );
}

export default App;
