import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Ingredient from "~/components/Ingredient";
import { api } from "~/utils/api";

const Recipe: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const recipe = api.recipe.getFullRecipe.useQuery(id).data?.result;
  const userId = recipe?.user as string;
  const user = api.user.getUserDetails.useQuery(userId).data?.result;

  const loadingDetails = {
    notes: "amaro: an Italian herbal liqueur commonly consumed as a digestif.",
    steps: ["Make the amaro", "Drink the amaro"],
    dateCreated: new Date(),
    defaultVolume: "0",
    defaultMeasure: "ml",
    name: "Loading Amaro...",
    imageUrl: "/loadingbottle.jpg",
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
        order: 0,
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
        order: 0,
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
        order: 0,
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
        order: 0,
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
        order: 0,
      },
    ],
  };

  const recipeDetails = recipe?.recipe || loadingDetails;
  const ingredients = recipe?.ingredients || loadingDetails.ingredients;
  const date = recipeDetails?.dateCreated;
  const steps = recipeDetails?.steps;
  const imageUrl = recipeDetails?.imageUrl;

  const tags = ["Herbal", "Smoky", "Bitter", "Vanilla", "Warm"];
  const itags = ["Bitter", "Herbal", "Warm"];

  return (
    <>
      <section className="flex w-9/12 flex-col justify-center gap-3">
        <div className="flex justify-between text-2xl">
          <div className="font-medium">{recipeDetails?.name}</div>
          <div>
            {recipeDetails?.defaultVolume} {recipeDetails?.defaultMeasure}
          </div>
        </div>

        <div className="mb-1 h-0.5 w-full rounded-md bg-orange-600"></div>

        <div className="grid grid-flow-col grid-cols-[6fr_48px_6fr_48px_3fr] grid-rows-[1fr_32px_2fr_24px_2fr]">
          <div className="pl-2 text-left text-lg italic text-orange-700">
            {recipeDetails?.notes}
          </div>

          <div className="col-start-3 flex h-fit w-2/3 flex-row flex-wrap justify-center gap-1 justify-self-center">
            {tags.map((tag) => (
              <div
                key={tag}
                className="h-fit w-fit rounded-md bg-rose-950 px-2 py-0.5 text-white shadow-sm shadow-orange-800/50 hover:scale-105"
              >
                {tag.toLowerCase()}
              </div>
            ))}
          </div>

          <div className="group col-start-5 flex flex-col self-start justify-self-end rounded-lg bg-orange-200 px-2 py-1 shadow-md shadow-orange-800/20">
            <div className="flex flex-row gap-10 py-1">
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
                  className="h-10 w-10 rounded-full"
                ></Image>
              ) : (
                <div className="h-10 w-10 rounded-full bg-black"></div>
              )}
            </div>
            <div className="text-xs text-stone-600">
              on {date?.toLocaleDateString("en-mt")} at{" "}
              {date?.toLocaleTimeString("en-mt", { timeStyle: "short" })}
            </div>
          </div>

          <div
            className={`relative row-span-3 row-start-3 aspect-[7/8] max-w-sm overflow-hidden rounded-xl ${
              !imageUrl ? "bg-black" : ""
            } shadow-md shadow-orange-800/20`}
          >
            {imageUrl && (
              <Image
                alt={recipeDetails?.name || ""}
                priority={true}
                src={imageUrl}
                fill={true}
                className="max-w-sm rounded-xl object-cover"
                sizes="20vw"
              ></Image>
            )}
          </div>

          <ul className="col-span-4 col-start-3 row-span-1 row-start-3 mt-6 grid grid-flow-dense auto-rows-min grid-cols-2 self-start">
            {ingredients.map((i) => (
              <Ingredient key={i.ingredientId} ingredient={i} itags={itags} />
            ))}
          </ul>

          <ol className="col-span-4 col-start-3 row-span-1 row-start-5 list-decimal">
            {steps?.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="flex w-9/12 flex-col justify-evenly text-center">
        <div className="pb-8 text-2xl">Similar Recipes</div>
        <div className="flex w-full items-center justify-between">
          <div className="group flex flex-col gap-2 py-1 hover:scale-105">
            <div
              className={`relative aspect-[7/8] h-60 rounded-lg ${
                !imageUrl ? "bg-black" : ""
              } shadow-md shadow-orange-800/20`}
            >
              {imageUrl && (
                <Image
                  alt="testing 1"
                  src={imageUrl}
                  fill={true}
                  className="max-w-sm rounded-lg object-cover"
                  sizes="20vw"
                  priority={false}
                ></Image>
              )}
            </div>
            <div className="text-violet-950 group-hover:text-orange-700">
              Testing 1
            </div>
          </div>

          <div className="group flex flex-col gap-2 py-1 hover:scale-105">
            <div
              className={`relative aspect-[7/8] h-60 rounded-lg ${
                !imageUrl ? "bg-black" : ""
              } shadow-md shadow-orange-800/20`}
            >
              {imageUrl && (
                <Image
                  alt="testing 1"
                  src={imageUrl}
                  fill={true}
                  className="max-w-sm rounded-lg object-cover"
                  sizes="20vw"
                  priority={false}
                ></Image>
              )}
            </div>
            <div className="text-violet-950 group-hover:text-orange-700">
              Testing 1
            </div>
          </div>

          <div className="group flex flex-col gap-2 py-1 hover:scale-105">
            <div
              className={`relative aspect-[7/8] h-60 rounded-lg ${
                !imageUrl ? "bg-black" : ""
              } shadow-md shadow-orange-800/20`}
            >
              {imageUrl && (
                <Image
                  alt="testing 1"
                  src={imageUrl}
                  fill={true}
                  className="max-w-sm rounded-lg object-cover"
                  sizes="20vw"
                  priority={false}
                ></Image>
              )}
            </div>
            <div className="text-violet-950 group-hover:text-orange-700">
              Testing 1
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recipe;
