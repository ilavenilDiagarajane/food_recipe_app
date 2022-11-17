import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
function RecipesDetails() {
  let { id } = useParams();
  const [recipes, setRecipe] = useState(null);
  useEffect(() => {
    fetch(`https://624a7f84fd7e30c51c0e48a5.mockapi.io/FoodRecipe/${id}`)
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        setRecipe(result);
      });
  }, []);
  console.log(recipes);
  return (
    <div className="recipeContainer">
      {recipes ? (
       
          <RecipesDetailsView recipesDetails={recipes} />
         
        
      ) : (
        "null"
      )}
    </div>
  );
}

function RecipesDetailsView({ recipesDetails }) {
  const navigate = useNavigate();
  function EditRecipes(id) {
    navigate(`/editrecipe/${id}`);
  }
  function DeleteRecipes(id) {
    alert(id)
    fetch(`https://624a7f84fd7e30c51c0e48a5.mockapi.io/FoodRecipe/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate(`/viewrecipe`);
      });
  }
  
 
  return (
    <>
      <Card style={{ width: "25rem" }}>
        <Card.Img variant="top" src={recipesDetails.poster} />
        <Card.Body>
          <div className="Ingredients">
          <Card.Title>{recipesDetails.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
          <i class="fa fa-clock-o" aria-hidden="true"></i>  {recipesDetails.time} mins
          </Card.Subtitle>
          </div>
        
          <div className="Ingredients">
          <Card.Title>Ingredients</Card.Title>
          <Card.Title>Quantity</Card.Title>
          </div>
          <div className="Ingredients">
          <Card.Subtitle className="mb-2 text-muted">
            {recipesDetails.ingredientName} 
          </Card.Subtitle>
        
          <Card.Subtitle className="mb-2 text-muted">
            {recipesDetails.ingredientQuantity}
          </Card.Subtitle>
          </div>
          
          <Card.Title>How to make {recipesDetails.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {recipesDetails.steps.map((e,index)=>
            <Card.Text>
           <b>steps{index+1}:</b> {e}
          </Card.Text>
            )}
          </Card.Subtitle>
          <div className="recipedetialbtn">
          <button className="buttonremove"onClick={() => EditRecipes(recipesDetails.id)} ><i class="fa fa-pencil-square" aria-hidden="true"></i></button>
          <button className="buttonremove" onClick={() => DeleteRecipes(recipesDetails.id)} >  <i class="fa fa-trash" aria-hidden="true"></i></button>
          </div>
        
        </Card.Body>
        
      </Card>
    </>
  );
}

export default RecipesDetails;
