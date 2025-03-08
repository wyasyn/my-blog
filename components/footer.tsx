import Link from "next/link";
import { navData } from "./nav-list";
import { Button } from "./ui/button";
import { socials } from "./homePage/hero";

const Footer = () => {
  return (
    <footer className=" py-6 w-full bg-secondary border-t rounded-[0_5rem_0_0] min-[1016px]:rounded-none min-[1200px]:rounded-[0_5rem_0_0]">
      <div className="wrapper px-3 text-center min-[1170px]:text-start min-[1170px]:px-0 flex flex-col min-[1170px]:flex-row min-[1170px]:justify-between gap-6 items-center">
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Yasin Walum. All rights reserved.
          </p>
          <Link
            className="text-xs underline hover:text-foreground duration-300"
            href={"/privacy-policy"}
          >
            Privacy Policy
          </Link>
        </div>

        <nav className="flex space-x-4 mt-4 md:mt-0 flex-wrap items-center justify-center">
          {navData.map((item, index) => {
            return (
              <Button key={index} variant="link" size="sm">
                <Link href={item.href}>{item.title}</Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex space-x-4 mt-4 md:mt-0 flex-wrap">
          {socials.map(({ name, icon, link }) => (
            <Button key={name} asChild variant="outline" size="icon">
              <Link href={link} target="_blank" rel="noopener noreferrer">
                {icon}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
