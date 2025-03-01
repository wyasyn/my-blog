import { FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiAndroidstudio,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiFlutter,
  SiTypescript,
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { DiPostgresql } from "react-icons/di";

export const skills = [
  {
    id: 1,
    name: "React",
    icon: <FaReact />,
    colorClass: "text-[#61DBFB]",
  },
  {
    id: 2,
    name: "Next.js",
    icon: <TbBrandNextjs />,
    colorClass: "text-black",
  },
  {
    id: 3,
    name: "TypeScript",
    icon: <SiTypescript />,
    colorClass: "text-[#007acc]",
  },
  {
    id: 4,
    name: "Python",
    icon: <FaPython />,
    colorClass: "text-[#3776AB]",
  },
  {
    id: 5,
    name: "Node.js",
    icon: <FaNodeJs />,
    colorClass: "text-[#68A063]",
  },
  {
    id: 6,
    name: "Javascript",
    icon: <IoLogoJavascript />,
    colorClass: "text-[#F7DF1E]",
  },
  {
    id: 7,
    name: "Django",
    icon: <SiDjango />,
    colorClass: "text-[#092E20]",
  },
  {
    id: 8,
    name: "Android Dev",
    icon: <SiAndroidstudio />,
    colorClass: "text-[#3DDC84]",
  },
  {
    id: 9,
    name: "Flutter",
    icon: <SiFlutter />,
    colorClass: "text-[#02569B]",
  },
  {
    id: 10,
    name: "SQL",
    icon: <DiPostgresql />,
    colorClass: "text-[#336791]",
  },
  {
    id: 11,
    name: "FastAPI",
    icon: <SiFastapi />,
    colorClass: "text-[#009688]",
  },
  {
    id: 12,
    name: "Flask",
    icon: <SiFlask />,
    colorClass: "text-black",
  },
];
