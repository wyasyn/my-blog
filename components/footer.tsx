import Link from "next/link";
import { navData } from "./nav-list";
import { Button } from "./ui/button";
import { socials } from "./homePage/hero";

const Footer = () => {
  return (
    <footer className=" py-6 w-full bg-secondary border-t rounded-[0_5rem_0_0]">
      <div className="wrapper px-0 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Yasin Walum. All rights reserved.
        </p>

        <nav className="flex space-x-4 mt-4 md:mt-0">
          {navData.map((item, index) => {
            return (
              <Button key={index} variant="link" size="sm">
                <Link href={item.href}>{item.title}</Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex space-x-4 mt-4 md:mt-0">
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
