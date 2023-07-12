import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Ingredient from "~/components/Ingredient";
import { api } from "~/utils/api";
import TagPill from "~/components/TagPill";
import RecipeUserInfo from "~/components/RecipeUserInfo";
import Head from "next/head";
import RecipeImageLink from "~/components/RecipeImageLink";
import NotesText from "~/components/NotesText";
import RecipeTitle from "~/components/RecipeTitle";
import RecipeMainImage from "~/components/RecipeMainImage";

const loadingSimilar = [
  {
    recipeId: "",
    imageUrl: "/loadingbottle.jpg",
    name: "loading..",
    n: "",
  },
];

const loadingDetails = {
  recipe: {
    notes: "amaro: an Italian herbal liqueur commonly consumed as a digestif.",
    steps: ["Make the amaro"],
    dateCreated: new Date(),
    defaultVolume: "0",
    defaultMeasure: "ml",
    name: "Loading Amaro...",
    imageUrl: "",
    tags: ["loading"],
  },
  userId: "",
  ingredients: [
    {
      ingredientId: "0",
      measure: "0",
      unitOfMeasure: "g",
      primaryName: "Loading root",
      altNames: "Lorem ipsum",
      shortDesc: "Lorem ipsum dolor",
      longDesc: "",
      usageNotes: "",
      tags: ["loading"],
    },
  ],
};

const Recipe: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const recipeRequest = api.recipe.getFullRecipe.useQuery(id);
  const recipe =
    !recipeRequest.isLoading && !recipeRequest.isError
      ? recipeRequest.data.result
      : loadingDetails;

  const recipeDetails = recipe.recipe;
  const ingredients = recipe.ingredients;
  const date = recipeDetails.dateCreated;
  const steps = recipeDetails.steps;
  const tags = recipeDetails.tags;

  const userId = recipe.userId;
  const user = api.user.getUserDetails.useQuery(userId).data?.result;

  const listOfSimilarRecipes =
    api.recipe.getSimilarRecipes.useQuery(id).data?.result || loadingSimilar;

  return (
    <>
      <Head>
        <title>Amaro Builder | {recipeDetails.name}</title>
      </Head>

      <section className="flex w-9/12 flex-grow flex-col justify-center gap-3">
        <RecipeTitle
          name={recipeDetails.name}
          volume={recipeDetails.defaultVolume}
          measure={recipeDetails.defaultMeasure}
        />

        <div className="mb-1 h-0.5 w-full rounded-md bg-orange-600"></div>

        <div className=" grid grid-flow-col auto-rows-min grid-cols-[2fr_2fr_1fr] gap-x-8 gap-y-2 2xl:grid-cols-[6fr_48px_6fr_48px_3fr] 2xl:grid-rows-[1fr_32px_2fr_24px_2fr] 2xl:gap-0">
          <NotesText notes={recipeDetails.notes} />

          <div className="col-start-2 mx-4 flex h-fit flex-row flex-wrap justify-center gap-1.5 justify-self-center 2xl:col-start-3">
            {tags
              .sort((a, b) => a.length - b.length)
              .map((tag) => (
                <TagPill tag={tag} key={tag} />
              ))}
          </div>

          <RecipeUserInfo user={user} date={date} />

          <RecipeMainImage
            imageUrl={recipeDetails.imageUrl}
            name={recipeDetails.name}
          />

          <ul className="col-span-2 col-start-2 row-span-1 row-start-2 grid grid-flow-dense auto-rows-min grid-cols-2 self-start 2xl:col-span-4 2xl:col-start-3 2xl:row-start-3 2xl:mt-6">
            {ingredients.map((i) => (
              <Ingredient key={i.ingredientId} ingredient={i} />
            ))}
          </ul>

          <ol className="col-span-2 col-start-2 row-span-1 row-start-3 list-decimal 2xl:col-span-4 2xl:col-start-3 2xl:row-start-5">
            {steps?.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="flex w-9/12 flex-shrink flex-grow flex-col justify-evenly text-center">
        <div className="text-xl 2xl:pb-8 2xl:text-2xl">Similar Recipes</div>
        <div className="flex w-full items-center justify-between">
          {listOfSimilarRecipes.map((rec, idx) => (
            <RecipeImageLink key={rec.recipeId || idx} recipe={rec} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Recipe;
