import { z } from "zod";
import Recipe from "~/server/models/Recipe";
import { createTRPCRouter, publicProcedure } from "../trpc";
import Neode from "neode";
import Ingredient from "~/server/models/Ingredient";
import User from "~/server/models/User";
import type { DateTime } from "neo4j-driver";
import { utapi } from "uploadthing/server";

type ReturnedRecipe = {
  recipeId: string;
  name: string;
  dateCreated: DateTime;
  notes: string;
  steps: string;
  defaultVolume: string;
  defaultMeasure: string;
  imageUrl: string;
};

type ProcessedRecipe = {
  recipeId: string;
  name: string;
  dateCreated: Date;
  notes: string;
  steps: Array<string>;
  defaultVolume: string;
  defaultMeasure: string;
  imageUrl: string;
};

type ReturnedIngredient = {
  ingredientId: string;
  primaryName: string;
  altNames: string;
  shortDesc: string;
  longDesc: string;
  usageNotes: string;
};

type ReturnedRel = {
  order: number;
  measure: string;
  unitOfMeasure: string;
};

type ReturnedUser = {
  clerkId: string;
};

type ReturnedFullRecipe = {
  r: { properties: ReturnedRecipe };
  rel: { properties: ReturnedRel };
  i: { properties: ReturnedIngredient };
  u: { properties: ReturnedUser };
};

const parseDate = (neo4jDateTime: DateTime): Date => {
  const { year, month, day, hour, minute, second, nanosecond } = neo4jDateTime;

  const date = new Date(
    year.toInt(),
    month.toInt() - 1, // neo4j dates start at 1, js dates start at 0
    day.toInt(),
    hour.toInt(),
    minute.toInt(),
    second.toInt(),
    nanosecond.toInt() / 1000000 // js dates use milliseconds
  );

  return date;
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
  getFullRecipe: publicProcedure.input(z.string()).query(async (opts) => {
    const instance = Neode.fromEnv().with({
      Recipe: Recipe,
      Ingredient: Ingredient,
      User: User,
    });

    const retRecipes: Array<ReturnedFullRecipe> = (
      await instance.cypher(
        "MATCH (u:User)-[:AUTHORED]->(r:Recipe {recipeId: $id})-[rel:HAS_INGREDIENT]->(i:Ingredient) RETURN u, r, rel, i",
        { id: opts.input }
      )
    ).records.map((rec) => rec.toObject() as ReturnedFullRecipe);

    const recipeDetails = retRecipes[0]?.r.properties as ReturnedRecipe;
    const processedRecipeDetails = {
      ...recipeDetails,
      imageUrl: (await utapi.getFileUrls(recipeDetails.imageUrl))[0]?.url || "",
      steps: JSON.parse(recipeDetails.steps) as Array<string>,
      dateCreated: parseDate(recipeDetails.dateCreated),
    } as ProcessedRecipe;
    const userId = retRecipes[0]?.u.properties.clerkId as string;
    const ingredients = retRecipes
      .map((o) => {
        return {
          ...o.i.properties,
          ...o.rel.properties,
        };
      })
      .sort((a, b) => a.order - b.order);

    return {
      result: {
        user: userId,
        recipe: processedRecipeDetails,
        ingredients: ingredients,
      },
    };
  }),
});
