import React from "react";
import classes from "./assets/HeroBanner.module.css";
import BgVideo from "./assets/recipe.mp4";

export const HeroBanner = () => {
  return (
    <div className={classes.HeroBanner}>
      <video loop muted autoPlay preload="auto">
        <source src={BgVideo} type="video/mp4" />
        Your browser doesnt support mp4
      </video>
      <div className={classes.Heading}>
        <h1>
          TasteIT <p>our recipes</p>
        </h1>
      </div>
    </div>
  );
};
