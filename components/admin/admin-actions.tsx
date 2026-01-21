'use client';
import { Button } from "../ui/button";
import { CheckIcon, XCircleIcon } from "lucide-react";
import { approvedProductActions, rejectProductActions } from "@/lib/admin/admin-actions";
import { Product } from "@/types";

const AdminActions = ({ status, productId }: { status: string, productId: Product["id"] }) => {
    const handleApprove = async () => {
        console.log("Approved");
        await approvedProductActions(productId);
    }
    const handleReject = async () => {
        console.log("Rejected");
        await rejectProductActions(productId);
    }
    return (
        <div className='space-y-2'>
            {status === "pending" && (
                <div className="flex gap-2">
                    <Button variant="default" className="hover:cursor-pointer" onClick={handleApprove}>
                        <CheckIcon className="size-4" />Approve</Button>
                    <Button variant="destructive" className="hover:cursor-pointer" onClick={handleReject}>
                        <XCircleIcon className="size-4" />Reject</Button>
                </div>
            )}
        </div>
    )
}

export default AdminActions