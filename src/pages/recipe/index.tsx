import { type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";

const RecipeHome: NextPage = () => {
  const listOfRecipes = api.recipe.getAllRecipes.useQuery().data?.result;
  
  return (
    <>
      <section className="flex w-10/12 min-w-full flex-grow flex-col items-center gap-20 pt-4">
        <div>Welcome to the recipe view page</div>
        <div className="flex flex-col items-center w-full">
          <div className="font-semibold">List of Recipes</div>
          <ul>
            {listOfRecipes?.map((recipe) => {
              return (
                <li key={recipe.recipeId}>
                  <Link
                    href={`recipe/${recipe.recipeId}`}
                    className=" text-violet-900"
                  >
                    {recipe.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default RecipeHome;
