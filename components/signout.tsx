import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="md:mt-auto"
    >
      <button
        className="bg-secondary px-3 flex items-center md:gap-3 py-2 rounded-lg w-full cursor-pointer"
        type="submit"
      >
        <LogOut className="w-4 h-4" />{" "}
        <span className="text-sm hidden md:block">Sign Out</span>
      </button>
    </form>
  );
}
