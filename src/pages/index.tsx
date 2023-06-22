import { type NextPage } from "next";
import Head from "next/head";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();

  const tags = ["Herbal", "Smoky", "Bitter", "Vanilla", "Warm"];
  const tastingNotes =
    "A light refreshing rabarbaro with hints of vanilla, a smoky aroma and nice herbal and minty finish";
  const amaroName = "Testing Amaro";
  const defaultAmount = 500;
  const defaultMeasure = "ml";
  const username = "volfym";
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
  ];
  const steps = ["Mix ingredients"];

  return (
    <>
      <Head>
        <title>Amaro Builder</title>
        <meta name="description" content="simple site for amaro recipes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex h-full flex-col items-center justify-between 2xl:max-w-7xl">
          <header className="flex h-28 w-full flex-row items-center justify-between gap-4 p-4 text-lg">
            <div>
              {user.isSignedIn && <UserButton afterSignOutUrl="/" />}
              {!user.isSignedIn && <SignInButton />}
            </div>

            <div className="flex flex-row justify-between gap-12 text-2xl">
              <div>Create</div>
              <div>View</div>
            </div>
          </header>

          <main className="flex w-10/12 flex-grow flex-col gap-3 pt-12">
            <div className="flex justify-between text-xl">
              <div className="font-medium">{amaroName}</div>
              <div>
                {defaultAmount} {defaultMeasure}
              </div>
            </div>

            <div className="h-1 w-full rounded-md bg-orange-600"></div>

            <div className="grid grid-flow-col grid-cols-[8fr_8fr_3fr] grid-rows-[1fr_3fr_3fr] gap-x-10">
              <div className="text-center italic text-orange-800">
                {tastingNotes}
              </div>

              <div className="col-start-2 flex flex-row flex-wrap justify-center gap-x-8 gap-y-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="h-fit w-fit rounded-md bg-orange-300 px-2 py-1"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="col-start-3 flex flex-col items-center">
                <div className="flex flex-row gap-12">
                  <div className="flex flex-col">
                    <div className="text-xs">Uploaded by</div>
                    <div className="font-medium">{username}</div>
                  </div>

                  <UserButton />
                </div>
                <div className="text-xs">{date}</div>
              </div>

              <div className="row-span-6 row-start-2 aspect-[7/8] w-full rounded-3xl bg-black"></div>

              <div className="grid grid-flow-dense auto-rows-min  grid-cols-2">
                {ingredients.map((i) => (
                  <div key={i.name} className="">
                    {i.amount}
                    {i.unit} {i.name}
                  </div>
                ))}
              </div>

              <div>
                <ol className="list-decimal">
                  {steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
            </div>
          </main>

          <section className="flex h-2/5 w-10/12 flex-col justify-evenly  text-center">
            <div>SIMILAR RECIPES</div>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-6 py-6">
                <div className="h-72 bg-black rounded-3xl aspect-[7/8]"></div>
                <div>Testing 1</div>
              </div>

              <div className="flex flex-col gap-6 py-6">
                <div className="h-72 bg-black rounded-3xl aspect-[7/8]"></div>
                <div>Testing 1</div>
              </div>

              <div className="flex flex-col gap-6 py-6">
                <div className="h-72 bg-black rounded-3xl aspect-[7/8]"></div>
                <div>Testing 1</div>
              </div>
            </div>
          </section>

          <footer className="flex justify-center pb-4">
            © Andre Sammut <br />
            sammut.dev [gh] [li]
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
