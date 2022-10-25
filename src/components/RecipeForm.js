import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./assets/RecipeForm.module.css";

const Ingredient = ({ add, change }) => {
  return (
    <div>
      <label htmlFor="ingredient">Ingredient: </label>
      <input
        onChange={change}
        name="ingredient"
        id="ingredient"
        type="text"
      ></input>
      <label htmlFor="quantity">Quantity: </label>
      <input
        required
        onChange={change}
        name="quantity"
        id="quantity"
        type="text"
      ></input>
    </div>
  );
};

export const RecipeForm = () => {
  const [ingredientAmount, setIngredientAmount] = useState(1);
  const [countries, setCountries] = useState([]);
  const [recipe, setRecipe] = useState({
    origin: "AFG",
    name: "",
    author: "",
    description: "",
    image: "",
    ingredients: [],
    instructions: "",
  });
  const [ingredient, setIngredient] = useState([
    { id: 1, ingredient: "", quantity: "" },
  ]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handlePost = (e) => {
    e.preventDefault();
    axios.post("https://dbforrecipes.herokuapp.com/recipes", recipe);
  };

  const handleIngredient = (e, i) => {
    const { name, value } = e.target;
    let ingredientList = [...ingredient];
    ingredientList[i][name] = value;
    setIngredient(ingredientList);
    setRecipe({ ...recipe, ingredients: ingredientList });
  };

  const addIngredient = () => {
    setIngredientAmount(ingredientAmount + 1);
    const newInc = { id: ingredient.length + 1, ingredient: "", quantity: "" };
    setIngredient([...ingredient, newInc]);
  };

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handlePost} className={classes.Form}>
      <div className={classes.Inputs}>
        <h1>Add new recipe</h1>
        <div>
          <label htmlFor="name">Dish name</label>
          <input
            required
            name="name"
            id="name"
            type="text"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            required
            name="author"
            id="author"
            type="text"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label htmlFor="origin">Recipe origin</label>
          <select required name="origin" onChange={(e) => handleChange(e)}>
            {countries.map((country) => {
              return (
                <option key={country.name} value={country.alpha3Code}>
                  {country.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            required
            name="description"
            id="description"
            type="text"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="image">Image url</label>
          <input
            name="image"
            id="image"
            type="text"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
      </div>
      <div className={classes.Ingredient}>
        <label>Ingredients</label>
        <p onClick={addIngredient}>Add more</p>
        {Array.from(Array(ingredientAmount), () => 0).map((_, i) => (
          <Ingredient change={(e) => handleIngredient(e, i)} key={i} />
        ))}
      </div>
      <div className={classes.Inputs}>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          required
          name="instructions"
          id="instructions"
          type="text"
          onChange={(e) => handleChange(e)}
        ></textarea>
        <button type="submit">Post recipe</button>
      </div>
    </form>
  );
};
