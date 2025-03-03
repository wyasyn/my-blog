import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="p-6 max-w-md border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4">You do not have permission to view this page.</p>
        <Button asChild className="mt-4 ">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
