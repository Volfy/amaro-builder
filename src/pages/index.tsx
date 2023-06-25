import { type NextPage } from "next";
import Head from "next/head";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();
  const retUser = api.example.testing.useQuery().data?.result[0];

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
      <Head>
        <title>Amaro Builder</title>
        <meta name="description" content="simple site for amaro recipes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex h-full flex-col items-center justify-between 2xl:max-w-7xl">
          <header className="flex h-28 w-full flex-row items-center justify-between gap-4 p-4 text-2xl">
            <div>
              {!user.isLoaded && 
              <div className="bg-black w-16 h-16 rounded-full"></div>  
            }
              {user.isSignedIn && (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarImage: "w-16 h-16",
                      avatarBox: "w-16 h-16",
                    },
                  }}
                />
              )}
              {!user.isSignedIn && <SignInButton />}
            </div>

            <div className="flex flex-row justify-between gap-12">
              <div>Create</div>
              <div>View</div>
            </div>
          </header>

          <main className="flex w-10/12 flex-grow flex-col gap-3 pt-4">
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
                    <div className="font-medium">{retUser?.username ? retUser?.username : 'loading' }</div>
                  </div>

                  {retUser?.profileImageUrl ? (
                    <Image
                      src={retUser?.profileImageUrl}
                      alt=""
                      width={200}
                      height={200}
                      className="h-10 w-10 rounded-full"
                    ></Image>
                  ) : <div className="bg-black w-10 h-10 rounded-full"></div>}
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
          </main>

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

          <footer className="flex flex-col items-center justify-center pb-4 text-sm">
            <div className="flex items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={12}
                viewBox="0 0 980 980"
              >
                <circle
                  cx="490"
                  cy="490"
                  r="440"
                  fill="none"
                  stroke="#000"
                  stroke-width="100"
                />
                <path d="M219,428H350a150,150 0 1 1 0,125H219a275,275 0 1 0 0-125z" />
              </svg>
              Andre Sammut
            </div>
            <div className="flex flex-row gap-1 text-orange-800">
              <a href="https://sammut.dev" className="hover:text-orange-700">
                sammut.dev
              </a>
              <a
                href="https://github.com/Volfy"
                className="hover:text-orange-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/andresammut98/"
                className="hover:text-orange-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  />
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
