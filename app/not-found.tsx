import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid place-items-center h-screen">
      <section className="flex flex-col items-center space-y-4">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </section>
    </main>
  );
}
