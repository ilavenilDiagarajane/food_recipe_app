import React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
function Viewrecipe() {
  const [recipesList, setRecipeList] = useState(null);

  useEffect(() => {
    fetch("https://624a7f84fd7e30c51c0e48a5.mockapi.io/FoodRecipe")
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        setRecipeList(result);
      });
  }, []);

  return (
    <div>
      {recipesList ? <DisplayrecipeList recipesList={recipesList} /> : "null"}
    </div>
  );
}

function DisplayrecipeList({ recipesList }) {
  const navigate = useNavigate();
  function showRecipes(id) {
    navigate(`/recipesdetails/${id}`);
  }

  return (
    <>
      {recipesList.map((recipes) => (
        <Card
          style={{ width: "18rem" }}
          onClick={() => showRecipes(recipes.id)}
        >
          <Card.Img variant="top" src={recipes.poster} />
          <Card.Body>
            <Card.Title>{recipes.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {recipes.time}
            </Card.Subtitle>

            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default Viewrecipe;
