import React, { useEffect, useState } from "react";
import classes from "./assets/Recipe.module.css";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const Ingredients = ({ ingredient, quantity, props }) => {
  return (
    <p className={classes.Ingredient}>
      {ingredient} {quantity}
    </p>
  );
};

export const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const id = useParams().recipeid;
  const location = useLocation();
  const flag = location.state;

  useEffect(() => {
    setIsLoading(true);

    axios.get(`http://localhost:3001/recipes/${id}`).then((res) => {
      setRecipe(res.data);
      setIngredients(res.data.ingredients);
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className={classes.Recipe}>
      <h1>{recipe.name}</h1>
      <div className={classes.Container}>
        <div className={classes.flagImg}>
          <img src={flag} alt="#" />
        </div>
        <div>
          <img
            src={
              recipe.image ||
              "https://cb2.scene7.com/is/image/CB2/FrankDinnerPlate10inSHF16/$web_pdp_main_carousel_sm$/190905021612/frank-dinner-plate.jpg"
            }
            alt="#image"
          ></img>
        </div>
        <div className={classes.Description}>
          <p>{recipe.description}</p>
          <p>{recipe.author}</p>
        </div>
        <div>
          <h2>Ingredients</h2>
          {ingredients.map((ingredient) => (
            <Ingredients key={ingredient.ingredient} {...ingredient} />
          ))}
        </div>
        <div className={classes.Preparation}>
          <h2>Preparation</h2>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};
