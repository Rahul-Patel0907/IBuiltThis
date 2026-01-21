import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="py-16">
            <div className="wrapper">
                {/* Back to Explore link */}
                <Skeleton className="h-6 w-32 mb-8" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-start gap-6">
                            <div className="flex-1 min-w-0">
                                <div className="mb-6 space-y-4">
                                    <Skeleton className="h-10 w-3/4" /> {/* Title */}
                                    <Skeleton className="h-6 w-1/2" /> {/* Tagline */}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-24" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>

                        {/* Product Details Box */}
                        <div className="border rounded-lg p-6 bg-primary/10 space-y-4">
                            <Skeleton className="h-7 w-32" />
                            <div className="space-y-3">
                                <Skeleton className="h-5 w-48" />
                                <Skeleton className="h-5 w-48" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            {/* Voting Card */}
                            <div className="border rounded-lg p-6 bg-background space-y-6">
                                <div className="flex flex-col items-center space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-12 w-16 rounded-lg" />
                                </div>
                            </div>
                            {/* Visit Website Button */}
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
