import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-zinc-50 dark:bg-zinc-950">
      <SignIn />
    </div>
  );
}
