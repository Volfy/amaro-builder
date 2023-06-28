import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

const Recipe: NextPage = () => {
  const retUser = api.example.testing.useQuery().data?.result[0];
  const router = useRouter();

  const tags = ["Herbal", "Smoky", "Bitter", "Vanilla", "Warm"];
  const tastingNotes =
    "A light refreshing rabarbaro with hints of vanilla, a smoky aroma and nice herbal and minty finish";
  const amaroName = "Testing Amaro";
  const defaultAmount = 500;
  const defaultMeasure = "ml";
  const date = "on 1st June 2023 at 16:34";
  const ingredients = [
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
    {
      name: "Citrus Peel",
      amount: 1,
      unit: "g",
      desc: "peel from citrus fruit, provides a bright and warm acidity",
      alt: "orange, lemon, lime, citron, Citrica Ceruluea",
    },
  ];
  const steps = ["Mix ingredients"];

  return (
    <>
      <div>{router.query.id}</div>
      <section className="flex w-10/12 flex-grow flex-col gap-3 pt-4">
        <div className="flex justify-between text-2xl">
          <div className="font-medium">{amaroName}</div>
          <div>
            {defaultAmount} {defaultMeasure}
          </div>
        </div>

        <div className="mb-1 h-1 w-full rounded-md bg-orange-600"></div>

        <div className="grid grid-flow-col grid-cols-[6fr_48px_6fr_48px_3fr] grid-rows-[1fr_24px_3fr_24px_2fr]">
          <div className="px-6 text-left italic text-orange-800">
            {tastingNotes}
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

          <div className="col-start-5 flex flex-col items-end pr-4">
            <div className="flex flex-row gap-10">
              <div className="flex flex-col">
                <div className="text-xs">Uploaded by</div>
                <div className="font-medium">
                  {retUser?.username ? retUser?.username : "loading"}
                </div>
              </div>

              {retUser?.profileImageUrl ? (
                <Image
                  src={retUser?.profileImageUrl}
                  alt=""
                  width={200}
                  height={200}
                  className="h-10 w-10 rounded-full"
                ></Image>
              ) : (
                <div className="h-10 w-10 rounded-full bg-black"></div>
              )}
            </div>
            <div className="text-xs">{date}</div>
          </div>

          <div className="row-span-3 row-start-3 aspect-[7/8] max-w-sm rounded-3xl bg-black"></div>

          <div className="col-span-4 col-start-3 row-span-1 row-start-3 grid grid-flow-dense auto-rows-min grid-cols-3 self-center text-lg">
            {ingredients.map((i, idx) => (
              <div key={i.name + idx.toString()} className="relative">
                <span className="peer">
                  {i.amount}
                  {i.unit} {i.name}
                </span>
                <div className="invisible absolute -left-12 top-6 z-10 block w-48 rounded-lg bg-orange-200 p-4 text-xs opacity-0 peer-hover:visible peer-hover:opacity-100 peer-hover:transition-opacity peer-hover:delay-200">
                  <div className="flex flex-col gap-2 text-center">
                    <div>{i.alt}</div>
                    <div>{i.desc}</div>
                    <div>tags</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-4 col-start-3 row-span-1 row-start-5 text-lg">
            <ol className="list-decimal">
              {steps.map((s) => (
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
