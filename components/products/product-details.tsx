import { getProductBySlug } from "@/lib/products/product-select";
import { notFound } from "next/navigation";
import { ExternalLinkIcon } from "lucide-react";

export default async function ProductDetails({ slug }: { slug: string }) {
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const { name, description, websiteUrl, tags, voteCount } = product;

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
                        <p className="text-muted-foreground mt-2 text-lg">{product.tagline}</p>
                    </div>
                    {/* Voting button will go here */}
                </div>

                <div className="flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                        <span key={tag} className="bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-full text-sm font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">{description}</p>
            </div>

            {websiteUrl && (
                <div className="flex items-center gap-2">
                    <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                        Visit Website <ExternalLinkIcon className="size-4" />
                    </a>
                </div>
            )}
        </div>
    );
}
