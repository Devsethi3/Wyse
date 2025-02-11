import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-9xl font-bold">404</h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold opacity-80">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </div>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
