import Head from "next/head";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Amaro Builder</title>
        <meta name="description" content="simple site for amaro recipes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen w-screen items-center justify-center ">
        <div className="flex h-fit min-h-screen flex-col items-center justify-between bg-orange-100 bg-[url('/bggrain.png')] shadow-lg shadow-orange-950 2xl:max-w-7xl">
          <header className="mb-4 flex h-min w-full flex-row items-center justify-between gap-4 bg-orange-200 p-4 px-16 text-xl shadow shadow-orange-800/40 2xl:text-2xl">
            <div>
              {!user.isLoaded && user.isSignedIn && (
                <div className="h-16 w-16 rounded-full bg-black shadow-lg"></div>
              )}
              {user.isSignedIn && (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarImage: "w-12 h-12 2xl:w-16 2xl:h-16",
                      avatarBox: "w-12 h-12 2xl:w-16 2xl:h-16 hover:scale-105",
                    },
                  }}
                />
              )}
              {!user.isSignedIn && <SignInButton />}
            </div>

            <div className="flex flex-row justify-between gap-12">
              <Link
                href="/"
                className="underline decoration-black underline-offset-8 hover:scale-105 hover:decoration-orange-600"
              >
                Home
              </Link>
              <Link
                href="/create"
                className="underline decoration-black underline-offset-8 hover:scale-105 hover:decoration-orange-600"
              >
                Create
              </Link>
              <Link
                href="/recipe"
                className="underline decoration-black underline-offset-8 hover:scale-105 hover:decoration-orange-600"
              >
                View
              </Link>
            </div>
          </header>
          {children}
          <footer className="mt-4 flex h-20 w-full flex-col items-center justify-center bg-orange-200 pb-1 text-sm shadow-[0_-1px_3px_0] shadow-orange-800/40">
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
              André Sasha Sammut
            </div>
            <div className="flex flex-row gap-1 text-violet-950">
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

export default Layout;
