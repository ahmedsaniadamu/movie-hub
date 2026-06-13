import { Skeleton } from "@/components/ui/skeleton";

const MovieDetailsSkeleton = () => {
    return (
        <div className="p-4 sm:p-8 max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-500">
            <Skeleton className="h-10 w-24 rounded-lg" />

            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start">
                <Skeleton className="aspect-[2/3] w-full rounded-3xl" />

                <div className="space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-3/4 sm:h-20" />
                        <div className="flex gap-6">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Skeleton className="h-20 w-48 rounded-2xl" />
                        <Skeleton className="h-14 w-44 rounded-2xl" />
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="h-8 w-32" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-2/3" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="h-8 w-24" />
                        <div className="flex gap-3">
                            <Skeleton className="h-10 w-24 rounded-full" />
                            <Skeleton className="h-10 w-28 rounded-full" />
                            <Skeleton className="h-10 w-20 rounded-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 pt-8 border-t border-border">
                        <div className="space-y-2"><Skeleton className="h-4 w-24" /> <Skeleton className="h-6 w-32" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-24" /> <Skeleton className="h-6 w-32" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-24" /> <Skeleton className="h-6 w-48" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-24" /> <Skeleton className="h-6 w-32" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailsSkeleton;