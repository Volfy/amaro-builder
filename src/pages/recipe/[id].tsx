import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

const Recipe: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const recipe = api.recipe.getFullRecipe.useQuery(id).data?.result;
  const userId = recipe?.user as string;
  const user = api.user.getUserDetails.useQuery(userId).data?.result;

  const recipeDetails = recipe?.recipe;
  const ingredients = recipe?.ingredients;
  const date = recipe?.date;
  const steps = recipeDetails?.steps
    .replace(/[0-9]?[0-9]\. /g, "--.--")
    .split("--.--")
    .filter((x) => x);

  const tags = ["Herbal", "Smoky", "Bitter", "Vanilla", "Warm"];

  return (
    <>
      <section className="flex w-10/12 flex-grow flex-col gap-3 pt-4">
        <div className="flex justify-between text-2xl">
          <div className="font-medium">{recipeDetails?.name}</div>
          <div>
            {recipeDetails?.defaultVolume} {recipeDetails?.defaultMeasure}
          </div>
        </div>

        <div className="mb-1 h-1 w-full rounded-md bg-orange-600"></div>

        <div className="grid grid-flow-col grid-cols-[6fr_48px_6fr_48px_3fr] grid-rows-[1fr_24px_3fr_24px_2fr]">
          <div className="px-6 text-left italic text-orange-800">
            {recipeDetails?.notes}
          </div>

          <div className="col-start-3 flex flex-row flex-wrap justify-center gap-x-8 gap-y-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="h-fit w-fit rounded-md bg-orange-300 px-4 py-1"
              >
                {tag}
              </div>
            ))}
          </div>

          <div className="col-start-5 flex flex-col self-start justify-self-end pr-4">
            <div className="flex flex-row gap-10 py-1">
              <div className="flex flex-col">
                <div className="text-xs">Uploaded by</div>
                <div className="font-medium">
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
            <div className="text-xs">
              on {date?.toLocaleDateString("en-mt")} at{" "}
              {date?.toLocaleTimeString("en-mt", { timeStyle: "short" })}
            </div>
          </div>

          <div className="row-span-3 row-start-3 aspect-[7/8] max-w-sm rounded-3xl bg-black"></div>

          <div className="col-span-4 col-start-3 row-span-1 row-start-3 mt-2 grid grid-flow-dense auto-rows-min grid-cols-2 self-start text-lg">
            {ingredients?.map((i) => (
              <div key={i.ingredientId} className="relative">
                <span className="peer">
                  {i.measure}
                  {i.unitOfMeasure} {i.primaryName}
                </span>
                <div className="invisible absolute -left-12 top-6 z-10 block w-48 rounded-lg bg-orange-200 p-4 text-xs opacity-0 peer-hover:visible peer-hover:opacity-100 peer-hover:transition-opacity peer-hover:delay-200">
                  <div className="flex flex-col gap-2 text-center">
                    <div>{i.altNames}</div>
                    <div>{i.shortDesc}</div>
                    <div>tags</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-4 col-start-3 row-span-1 row-start-5 text-lg">
            <ol className="list-decimal">
              {steps?.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="flex h-2/5 w-10/12 flex-col justify-evenly text-center">
        <div className="text-2xl">Similar Recipes</div>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-6 py-6">
            <div className="aspect-[7/8] h-72 rounded-3xl bg-black"></div>
            <div>Testing 1</div>
          </div>

          <div className="flex flex-col gap-6 py-6">
            <div className="aspect-[7/8] h-72 rounded-3xl bg-black"></div>
            <div>Testing 1</div>
          </div>

          <div className="flex flex-col gap-6 py-6">
            <div className="aspect-[7/8] h-72 rounded-3xl bg-black"></div>
            <div>Testing 1</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recipe;
