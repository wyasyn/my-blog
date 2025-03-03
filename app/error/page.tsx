import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="p-6 max-w-md border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600">
          Something Went Wrong
        </h1>
        <p className="mt-4">
          An unexpected error occurred. Please try again later.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
