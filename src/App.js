import "./App.css";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { RecipeForm } from "./components/RecipeForm";
import { AllRecipes } from "./components/AllRecipes";
import { Main } from "./components/Main";
import { Recipe } from "./components/Recipe";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route path="/" element={<Main />} />
            <Route path="recipes" element={<AllRecipes />} />
            <Route path="create" element={<RecipeForm />} />
            <Route path="recipes/:recipeid" element={<Recipe />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
