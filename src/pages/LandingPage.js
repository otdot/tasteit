import React from "react";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
