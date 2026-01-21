'use server';
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validation";
import db from "@/db";
import { products } from "@/db/schema";
import z from "zod"
import { FormState } from "@/types";
import { refresh, revalidatePath } from "next/cache";

export const addProductAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    console.log(formData);

    //auth 

    try {

        const { userId, orgId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: "You must be signed in to submit a product",
            }
        }

        if (!orgId) {
            return {
                success: false,
                message: "You must be a member of an organization to submit a product",
            }
        }

        const user = await currentUser();
        const userEmail = user?.emailAddresses[0]?.emailAddress || "anonymous";

        const rawFormData = Object.fromEntries(formData.entries());
        const validatedData = productSchema.safeParse(rawFormData);

        if (!validatedData.success) {
            console.log(validatedData.error.flatten().fieldErrors);
            return {
                success: false,
                errors: validatedData.error.flatten().fieldErrors,
                message: "Invalid Data",
            }
        }

        const { name, slug, tagline, description, websiteUrl, tags } = validatedData.data;

        await db.insert(products).values({
            name,
            slug,
            tagline,
            description,
            websiteUrl,
            tags,
            status: "pending",
            submittedBy: userEmail,
            organizationId: orgId,
            userId,
        });

        return {
            success: true,
            message: "Product submitted successfully! It will be reviewed shortly."
        };
    } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.flatten().fieldErrors,
                message: "Validation Failed please Check the Product.",
            }
        }

        return {
            success: false,
            message: "Failed To Submit Product",
        };
    }


};

export const upvoteProductAction = async (productId: number) => {
    try {

        const { userId, orgId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: "You must be signed in to upvote a product",
            }
        }

        if (!orgId) {
            return {
                success: false,
                message: "You must be a member of an organization to upvote a product",
            }
        }

        await db.update(products).set({
            voteCount: sql`GREATEST(0,vote_count + 1)`,
        }).where(eq(products.id, productId));

        revalidatePath("/");

        return {
            success: true,
            message: "Product upvoted successfully!",

        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed To Upvote Product",
            voteCount: 0,
        }
    }
}

export const downvoteProductAction = async (productId: number) => {
    try {

        const { userId, orgId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: "You must be signed in to upvote a product",
            }
        }

        if (!orgId) {
            return {
                success: false,
                message: "You must be a member of an organization to upvote a product",
            }
        }

        await db.update(products).set({
            voteCount: sql`GREATEST(0,vote_count - 1)`,
        }).where(eq(products.id, productId));

        revalidatePath("/");

        return {
            success: true,
            message: "Product downvoted successfully!",

        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed To downvote Product",
            voteCount: 0,
        }
    }
}