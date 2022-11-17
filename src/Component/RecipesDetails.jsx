import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
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
  console.log(recipes)
  return <div>
    {recipes?<RecipesDetailsView recipesDetails={recipes}/>:"null"}</div>;
}

function RecipesDetailsView({recipesDetails}) {

    return(
        <> 
          <Card
          style={{ width: "18rem" }}
        
        >
          <Card.Img variant="top" src={recipesDetails.poster} />
          <Card.Body>
            <Card.Title>{recipesDetails.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {recipesDetails.time}
            </Card.Subtitle>

            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        </>  
    )
}

export default RecipesDetails;
