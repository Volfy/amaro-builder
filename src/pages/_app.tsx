import { type AppType } from "next/app";
import { useRouter } from 'next/router';

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { 
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

const publicPages = [
  "/",
  "/sign-in/[[...index]]", 
  "/sign-up/[[...index]]"
];


const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname)

  return (
    <ClerkProvider {...pageProps}>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )} 
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
