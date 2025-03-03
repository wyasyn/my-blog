import { Skeleton } from "./ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Skeleton className="h-[200px]" />
      <Skeleton className="h-[200px]" />
      <Skeleton className="h-[200px]" />
      <Skeleton className="h-[200px]" />
    </div>
  );
}
