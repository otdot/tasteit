import React from "react";
import classes from "./assets/Header.module.css";
import { NavLink, Link } from "react-router-dom";

export const Header = () => {
  const activeLink = ({ isActive }) => {
    return {
      color: isActive ? "green" : "black",
      textDecoration: isActive ? "underline" : "none",
    };
  };
  return (
    <header className={classes.Header}>
      <Link to="/">
        <h1>TasteIT</h1>
      </Link>
      <nav>
        <NavLink style={activeLink} to="/">
          Home
        </NavLink>
        <NavLink style={activeLink} to="/recipes">
          Recipes{" "}
        </NavLink>
        <NavLink style={activeLink} to="/create">
          Create Recipe{" "}
        </NavLink>
      </nav>
    </header>
  );
};
