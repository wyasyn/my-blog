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
      className={cn("z-1 aspect-square overflow-x-clip absolute ", className)}
    >
      <div
        className={cn(
          "grid grid-cols-2 aspect-square gap-4 rotate-45 ",
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
