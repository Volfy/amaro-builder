import { type NextPage } from "next";
import { api } from "~/utils/api";
import RecipeImageLink from "~/components/RecipeImageLink";
import Head from "next/head";

const RecipeHome: NextPage = () => {
  const allRecipesRequest = api.recipe.getAllRecipes.useQuery();
  const listOfRecipes = allRecipesRequest.data?.result;

  return (
    <>
      <Head>
        <title>Amaro Builder | List of Recipes</title>
      </Head>
      <section className="flex w-10/12 min-w-full flex-grow flex-col items-center gap-y-8 pt-4">
        <div className="text-xl font-semibold 2xl:text-2xl">
          List of Recipes
        </div>
        <div className="grid-rows-auto grid grid-flow-row grid-cols-3 gap-x-16 gap-y-8">
          {listOfRecipes?.map((recipe) => (
            <RecipeImageLink recipe={recipe} key={recipe.recipeId} />
          ))}
        </div>
      </section>
    </>
  );
};

export default RecipeHome;
