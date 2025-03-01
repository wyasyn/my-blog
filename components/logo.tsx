import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import profilePic from "@/lib/assets/images/hero.jpg";
export default function Logo() {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/">
        <Image
          src={profilePic.src}
          width={profilePic.width}
          height={profilePic.height}
          alt="Profile pic"
          className="object-cover rounded-md"
        />
      </Link>
    </Button>
  );
}
