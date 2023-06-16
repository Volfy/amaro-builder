import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="flex justify-center content-center h-screen w-screen">
      <SignIn />
    </div>
}