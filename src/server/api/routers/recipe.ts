import Recipe from "~/server/models/Recipe";
import { createTRPCRouter, publicProcedure } from "../trpc";
import Neode from "neode";

type ReturnedRecipe = {
  recipeId: "string";
  name: "string";
};

export const recipeRouter = createTRPCRouter({
  getAllRecipes: publicProcedure.query(async () => {
    const instance = Neode.fromEnv().with({
      Recipe: Recipe,
    });

    const retRecipes = await instance.all("Recipe");
    const recipes = (await retRecipes.toJson()) as Array<ReturnedRecipe>;
    const filteredRecipes = recipes.map((r: ReturnedRecipe) => {
      return { recipeId: r.recipeId, name: r.name };
    });

    return {
      result: filteredRecipes,
    };
  }),
});
