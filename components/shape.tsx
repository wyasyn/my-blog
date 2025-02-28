import { cn } from "@/lib/utils";

export default function Shape({
  className,
  translate,
}: {
  className: string;
  translate: string;
}) {
  return (
    <div
      className={cn(
        " max-[1305px]:hidden aspect-square overflow-x-clip absolute ",
        className
      )}
    >
      <div
        className={cn(
          "grid grid-cols-2 w-[200px] 2xl:w-[300px] aspect-square gap-4 rotate-45 ",
          translate
        )}
      >
        <div className="border " />
        <div className="border " />
        <div className="border " />
        <div className="border " />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background" />
      </div>
    </div>
  );
}
