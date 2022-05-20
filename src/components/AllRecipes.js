import React, { useEffect, useState } from "react";
import classes from "./assets/AllRecipes.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .all([
        axios.get("https://dbfortasteitapp.herokuapp.com/recipes"),
        axios.get("https://restcountries.com/v2/all"),
      ])
      .then(
        axios.spread((res1, res2) => {
          setRecipes(res1.data);
          setFlags(res2.data);
        })
      );
    setIsLoading(false);
  }, []);

  // const deleteAllRecipes = () => {
  //   for (let i = 3; i <= recipes.length; i++) {
  //     axios
  //       .delete(`http://localhost:3001/recipes/${i}`)
  //       .then((res) => console.log(res));
  //   }
  // };

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      {/* <button onClick={deleteAllRecipes}>delete all recipes</button> */}
      <div className={classes.Input}>
        <input
          placeholder="Search for a recipe"
          className={classes.focus}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
      </div>
      <div className={classes.AllRecipes}>
        {recipes
          .filter((recipe) => {
            if (searchTerm === "") {
              return recipe;
            } else if (
              recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return recipe;
            }
          })
          .map((recipe) => {
            const flag = flags.find(
              (flag) => flag.alpha3Code === recipe.origin
            );

            return (
              <div key={recipe.id} className={classes.Recipe}>
                <img
                  className={classes.flagImg}
                  src={flag.flags.svg}
                  alt="flag of country"
                />
                <img
                  className={classes.recipeImg}
                  src={
                    recipe.image ||
                    "https://cb2.scene7.com/is/image/CB2/FrankDinnerPlate10inSHF16/$web_pdp_main_carousel_sm$/190905021612/frank-dinner-plate.jpg"
                  }
                  alt="recipe"
                />
                <div className={classes.recipeInfo}>
                  <h1>{recipe.name}</h1>
                  <Link to={`/recipes/${recipe.id}`} state={flag.flags.svg}>
                    see more
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
