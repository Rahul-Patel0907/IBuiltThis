'use server'
import { Product } from "@/types";
import db from "@/db";
import { eq } from "drizzle-orm";
import { products } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const approvedProductActions = async (productId: Product["id"]) => {
    try {
        await db.update(products).set({
            status: "approved", approvedAt: new Date()
        }).where(eq(products.id, productId))

        revalidatePath("/admin");

        return {
            success: true,
            message: "Product approved successfully"
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to approve product"
        }
    }
}

export const rejectProductActions = async (productId: Product["id"]) => {
    try {
        await db.update(products).set({
            status: "rejected"
        }).where(eq(products.id, productId))

        revalidatePath("/admin");

        return {
            success: true,
            message: "Product rejected successfully"
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to reject product"
        }
    }
}

export const deleteProductActions = async (productId: Product["id"]) => {
    try {
        await db.delete(products).where(eq(products.id, productId))

        revalidatePath("/admin");

        return {
            success: true,
            message: "Product deleted successfully"
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to delete product"
        }
    }
}