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
  tags: Array<string>;
};

type ReturnedIngredient = {
  ingredientId: string;
  primaryName: string;
  altNames: string;
  shortDesc: string;
  longDesc: string;
  usageNotes: string;
  measure: string;
  unitOfMeasure: string;
  tags: Array<string>;
};

type ReturnedFullRecipe = {
  recipe: ReturnedRecipe;
  userId: string;
  ingredients: Array<ReturnedIngredient>;
  tags: Array<string>;
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

    const retRecipe: ReturnedFullRecipe = (
      await instance.cypher(
        // lmao
        `MATCH (r:Recipe {recipeId: $id}), 
        (i:Ingredient), 
        (u:User), 
        ()-[rel:HAS_INGREDIENT]-(), 
        (x:Tag), 
        (t:Tag)
    WHERE (r)-[rel]->(i) AND (u)-->(r) AND (i)-->(x) AND (r)-->(t)
    WITH i {.*, unitOfMeasure: rel.unitOfMeasure, measure: rel.measure, order: rel.order} as ing, 
        collect(distinct x.name) as tags, u as u, r as r, collect(distinct t.name) as rtags
    WITH ing {.*, tags} as ingredient, u as u, r as r, rtags as tags
    ORDER BY ingredient.order
    RETURN u.clerkId as userId, r {.*} as recipe, collect(distinct ingredient) as ingredients, tags
        `,
        { id: opts.input }
      )
    ).records.map((rec) => rec.toObject())[0] as ReturnedFullRecipe;

    const processedRecipeDetails = {
      ...retRecipe.recipe,
      steps: JSON.parse(retRecipe.recipe.steps) as Array<string>,
      dateCreated: parseDate(retRecipe.recipe.dateCreated),
      tags: retRecipe.tags.slice(0, 12),
    } as ProcessedRecipe;

    const processedIngredientDetails = retRecipe.ingredients.map((i) => {
      return {
        ...i,
        tags: i.tags.slice(0, 6),
      };
    });
    return {
      result: {
        userId: retRecipe.userId,
        recipe: processedRecipeDetails,
        ingredients: processedIngredientDetails,
      },
    };
  }),
  getSimilarRecipes: publicProcedure.input(z.string()).query(async (opts) => {
    const instance = Neode.fromEnv().with({
      Recipe: Recipe,
    });

    type SimilarReturned = {
      name: string;
      imageUrl: string;
      recipeId: string;
      n: {
        low: number;
      };
    };

    const retRecipes: Array<SimilarReturned> = (
      await instance.cypher(
        `MATCH (r:Recipe {recipeId: $id})--()--(s:Recipe) Return s.name as name, s.imageUrl as imageUrl, s.recipeId as recipeId, count(s) AS n ORDER BY (n + (rand() * 10)) desc LIMIT 3`,
        { id: opts.input }
      )
    ).records.map((rec) => rec.toObject() as SimilarReturned);

    const cleaned = retRecipes.sort((a, b) => b.n.low - a.n.low);

    return {
      result: cleaned,
    };
  }),
});
