import React from "react";
import { Link } from "react-router-dom";
import { HeroBanner } from "../components/HeroBanner";
import classes from "./assets/Main.module.css";

export const Main = () => {
  return (
    <main>
      <div>
        <HeroBanner />
      </div>
      <div className={classes.Main}>
        <div>
          <Link to="/recipes">All Recipes</Link>
          <p>TasteIT recipes</p>
        </div>
        <div>
          <Link to="/create">Create a Recipe</Link>
          <p>TasteIT recipes</p>
        </div>
        <div>
          <a href="https://www.bc.fi">My school</a>
          <p>My school</p>
        </div>
      </div>
    </main>
  );
};
