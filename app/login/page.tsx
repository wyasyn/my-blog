import SignIn from "@/components/signin";
import { Terminal } from "lucide-react";
import logInImage from "@/lib/assets/images/login.jpg";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Terminal className="size-4" />
            </div>
            Yasify.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignIn />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={logInImage.src}
          alt="login image"
          className="absolute inset-0 h-full w-full object-cover "
          width={logInImage.width}
          height={logInImage.height}
          placeholder="blur"
          blurDataURL={logInImage.blurDataURL}
        />
      </div>
    </div>
  );
}
