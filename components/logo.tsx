import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import profilePic from "@/lib/assets/images/hero.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Logo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button asChild variant="ghost" size="icon" className="cursor-pointer">
          <Image
            src={profilePic.src}
            width={profilePic.width}
            height={profilePic.height}
            alt="Profile pic"
            className="object-cover rounded-md"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link className="w-full" href="/">
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="/dashboard">
            Dashboard
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
