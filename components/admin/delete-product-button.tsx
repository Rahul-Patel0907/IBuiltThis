'use client';
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { deleteProductActions } from "@/lib/admin/admin-actions";
import { Product } from "@/types";

export function DeleteProductButton({ productId }: { productId: Product["id"] }) {
    const handleDelete = async () => {
        await deleteProductActions(productId);
    }

    return (
        <Button variant="outline" onClick={handleDelete}>
            <TrashIcon className="size-4 mr-2" />
            Delete
        </Button>
    );
}
