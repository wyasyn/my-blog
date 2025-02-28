import { GitMerge, Pi } from "lucide-react";

export default function Shape() {
  return (
    <>
      <div className=" max-[1343px]:hidden absolute top-1/6 left-0 z-1 overflow-clip text-border/45 ">
        <GitMerge size={250} className="-rotate-12 stroke-1 -ml-14   " />
        <div className="absolute z-2 inset-0 bg-gradient-to-br from-transparent to-background" />
      </div>
      <div className=" max-[1343px]:hidden absolute top-1/6 right-0 z-1 overflow-clip text-border/45 ">
        <GitMerge size={250} className="rotate-120 stroke-1 -mr-14   " />
        <div className="absolute z-2 inset-0 bg-gradient-to-bl from-transparent to-background" />
      </div>
      <div className=" absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-1 overflow-clip text-border/15 ">
        <Pi size={250} className=" stroke-1 rotate-6 -mr-14   " />
        <div className="absolute z-2 inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>
    </>
  );
}
