'use client';
import FormField from "@/components/forms/form-field";
import { Button } from "../ui/button";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { addProductAction } from "@/lib/products/product-actions";
import { useActionState } from "react";
import { FormState } from "@/types";
import { cn } from "@/lib/utils";


const initialState: FormState = {
    success: false,
    errors: {},
    message: ""
}

const ProductSubmitForm = () => {

    const [state, formAction, isPending] = useActionState(addProductAction, initialState);
    const { errors, message, success } = state;
    return (
        <form className='space-y-6' action={formAction}>
            {message && (
                <div className={cn('p-4 rounded-lg border', success ? 'bg-primary/10 border-primary text-primary' : 'bg-destructive/10 border-destructive text-destructive')} role='alert' aria-live='polite'>{message}</div>
            )}
            <FormField
                label="Product Name"
                name="name"
                id="name"
                placeholder="My Awesome Product"
                required
                onChange={() => { }}
                error={errors?.name ?? []}
            />
            <FormField
                label="Slug"
                name="slug"
                id="slug"
                placeholder="my-awesome-product"
                required
                onChange={() => { }}
                error={errors?.slug ?? []}
                helperText="URL-friendly version of your product name"
            />
            <FormField
                label="Tagline"
                name="tagline"
                id="tagline"
                placeholder="A brief catchy description"
                required
                onChange={() => { }}
                error={errors?.tagline ?? []}
            />
            <FormField
                label="Description"
                name="description"
                id="description"
                placeholder="Tell us more about your product"
                required
                onChange={() => { }}
                error={errors?.description ?? []}
                textarea
            />
            <FormField
                label="Website URL"
                name="websiteUrl"
                id="websiteUrl"
                placeholder="https://myawesomproduct.com"
                required
                onChange={() => { }}
                error={errors?.websiteUrl ?? []}
            />
            <FormField
                label="Tags"
                name="tags"
                id="tags"
                placeholder="AI, Productivity, SaaS"
                required
                onChange={() => { }}
                error={errors?.tags ?? []}
                helperText="Comma-separated tags (e.g., AI, SaaS, Productivity)"
            />

            <Button
                type="submit" size="lg"
                className="w-full"
            >{isPending ? (<Loader2Icon className="animate-spin size-4" />) : (<SparklesIcon className="size-4" />)}
                Submit Product
            </Button>

        </form>
    )
}

export default ProductSubmitForm