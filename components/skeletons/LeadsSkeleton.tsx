import { Skeleton } from "@/components/ui/skeleton";

export function LeadsSkeleton() {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 px-4 py-2 border-b">
          <div className="flex items-center">
            <Skeleton className="h-4 w-12" />
          </div>

          <div className="flex items-center">
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="flex items-center">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>

          <div className="flex items-center">
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
