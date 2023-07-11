import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Ingredient from "~/components/Ingredient";
import { api } from "~/utils/api";
import Link from "next/link";

const Recipe: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const recipe = api.recipe.getFullRecipe.useQuery(id).data?.result;
  const userId = recipe?.userId as string;
  const user = api.user.getUserDetails.useQuery(userId).data?.result;

  const loadingSimilar = [
    {
      recipeId: "",
      imageUrl: "/loadingbottle.jpg",
      name: "loading..",
      n: "",
    },
    {
      recipeId: "",
      imageUrl: "/loadingbottle.jpg",
      name: "loading..",
      n: "",
    },
    {
      recipeId: "",
      imageUrl: "/loadingbottle.jpg",
      name: "loading..",
      n: "",
    },
  ];

  const loadingDetails = {
    notes: "amaro: an Italian herbal liqueur commonly consumed as a digestif.",
    steps: ["Make the amaro", "Drink the amaro"],
    dateCreated: new Date(),
    defaultVolume: "0",
    defaultMeasure: "ml",
    name: "Loading Amaro...",
    imageUrl: "/loadingbottle.jpg",
    tags: ["loading"],
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
      {
        ingredientId: "1",
        measure: "0",
        unitOfMeasure: "g",
        primaryName: "Loading root",
        altNames: "Lorem ipsum",
        shortDesc: "Lorem ipsum dolor",
        longDesc: "",
        usageNotes: "",
        tags: ["loading"],
      },
      {
        ingredientId: "2",
        measure: "0",
        unitOfMeasure: "g",
        primaryName: "Loading root",
        altNames: "Lorem ipsum",
        shortDesc: "Lorem ipsum dolor",
        longDesc: "",
        usageNotes: "",
        tags: ["loading"],
      },
      {
        ingredientId: "3",
        measure: "0",
        unitOfMeasure: "g",
        primaryName: "Loading root",
        altNames: "Lorem ipsum",
        shortDesc: "Lorem ipsum dolor",
        longDesc: "",
        usageNotes: "",
        tags: ["loading"],
      },
      {
        ingredientId: "4",
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

  const recSimilar =
    api.recipe.getSimilarRecipes.useQuery(id).data?.result || loadingSimilar;
  const similar = recSimilar.map((recipe) => {
    return {
      ...recipe,
      imageUrl:
        api.ut.getImageUrl.useQuery(recipe.imageUrl).data?.result ||
        "/loadingbottle.jpg",
    };
  });
  const recipeDetails = recipe?.recipe || loadingDetails;
  const ingredients = recipe?.ingredients || loadingDetails.ingredients;
  const date = recipeDetails?.dateCreated;
  const steps = recipeDetails?.steps;
  const imageUrl =
    api.ut.getImageUrl.useQuery(recipeDetails?.imageUrl).data?.result ||
    "/loadingbottle.jpg";
  const tags = recipeDetails?.tags;

  return (
    <>
      <section className="flex w-9/12 flex-grow flex-col justify-center gap-3">
        <div className="flex justify-between text-xl 2xl:text-2xl">
          <div className="font-medium">{recipeDetails?.name}</div>
          <div>
            {recipeDetails?.defaultVolume} {recipeDetails?.defaultMeasure}
          </div>
        </div>

        <div className="mb-1 h-0.5 w-full rounded-md bg-orange-600"></div>

        <div className=" grid grid-flow-col auto-rows-min grid-cols-[2fr_2fr_1fr] gap-x-8 gap-y-2 2xl:grid-cols-[6fr_48px_6fr_48px_3fr] 2xl:grid-rows-[1fr_32px_2fr_24px_2fr] 2xl:gap-0">
          <div className="pl-2 text-left text-base italic text-orange-700 2xl:text-lg">
            {recipeDetails?.notes}
          </div>

          <div className="col-start-2 mx-4 flex h-fit flex-row flex-wrap justify-center gap-1.5 justify-self-center 2xl:col-start-3">
            {tags
              .sort((a, b) => a.length - b.length)
              .map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-md bg-rose-950 px-2 py-0.5 text-white shadow-sm shadow-orange-800/50 hover:scale-105"
                >
                  {tag.toLowerCase()}
                </span>
              ))}
          </div>

          <div className="group col-start-3 flex flex-col self-start justify-self-end rounded-lg bg-orange-200 px-2 py-1 shadow-md shadow-orange-800/20 2xl:col-start-5">
            <div className="flex flex-row gap-0 py-1 lg:gap-10">
              <div className="flex flex-col">
                <div className="text-xs text-stone-600">Uploaded by</div>
                <div className="text-violet-950 group-hover:text-orange-700">
                  {user?.username ? user?.username : "loading"}
                </div>
              </div>

              {user?.profileImageUrl ? (
                <Image
                  src={user?.profileImageUrl}
                  alt=""
                  width={200}
                  height={200}
                  className="h-8 w-8 rounded-full 2xl:h-10 2xl:w-10"
                ></Image>
              ) : (
                <div className="h-8 w-8 bg-black 2xl:h-10 2xl:w-10"></div>
              )}
            </div>
            <div className="text-xs text-stone-600">
              on {date?.toLocaleDateString("en-mt")} at{" "}
              {date?.toLocaleTimeString("en-mt", { timeStyle: "short" })}
            </div>
          </div>

          <div className="relative row-span-2 row-start-2 aspect-[7/8] overflow-hidden rounded-xl shadow-md shadow-orange-800/20 2xl:row-span-4 2xl:row-start-3">
            {imageUrl && (
              <Image
                alt={recipeDetails?.name || ""}
                priority={true}
                src={imageUrl}
                fill={true}
                className="rounded-xl object-cover"
                sizes="20vw"
              ></Image>
            )}
          </div>

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
          {similar?.map((rec, idx) => (
            <div
              className="group gap-2 py-1 hover:scale-105"
              key={rec.recipeId || idx}
            >
              <Link
                href={`/recipe/${rec.recipeId || id}`}
                className="flex flex-col items-center"
              >
                <div className="relative aspect-[7/8] h-48 flex-grow-0 rounded-lg shadow-md shadow-orange-800/20 2xl:h-60">
                  {rec.imageUrl && (
                    <Image
                      alt={rec.name || ""}
                      src={rec.imageUrl || "/loadingbottle.jpg"}
                      fill={true}
                      className="max-w-sm rounded-lg object-cover"
                      sizes="20vw"
                      priority={false}
                    ></Image>
                  )}
                </div>
                <div className="text-violet-950 group-hover:text-orange-700">
                  {rec.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Recipe;
