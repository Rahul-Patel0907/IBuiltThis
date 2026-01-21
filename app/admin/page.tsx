import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SectionHeader from "@/components/common/section-header";
import StatsCard from "@/components/admin/stats-card";
import { getEveryProducts } from "@/lib/products/product-select";
import AdminProductCard from "@/components/admin/admin-product-card";
import { Suspense } from "react";
import EmptyState from "@/components/common/empty-state";
import { InboxIcon, LoaderCircleIcon, SettingsIcon } from "lucide-react";


const AdminPage = () => {
    return (
        <div className="py-20">
            <div className="wrapper">
                <div className="mb-12">
                    <SectionHeader
                        title="Admin Dashboard"
                        icon={SettingsIcon}
                        description="Review and manage submitted products."
                    />
                </div>
                <Suspense fallback={<div className="flex justify-center py-20">Loading dashboard data...</div>}>
                    <AdminDashboard />
                </Suspense>
            </div>
        </div>
    )
}

async function AdminDashboard() {
    const { userId } = await auth();
    if (!userId) {
        redirect("/sign-in");
    }

    const response = await clerkClient();
    const user = await response.users.getUser(userId);

    const metadata = user.publicMetadata;
    const isAdmin = metadata?.isAdmin ?? false;
    if (!isAdmin) {
        redirect("/");
    }

    const allProducts = await getEveryProducts();
    const approvedProducts = allProducts.filter((product) => product.status === "approved");
    const pendingProducts = allProducts.filter((product) => product.status === "pending");
    const rejectedProducts = allProducts.filter((product) => product.status === "rejected");

    return (
        <>
            <StatsCard approved={approvedProducts.length} pending={pendingProducts.length} rejected={rejectedProducts.length} total={allProducts.length} />
            <section className="my-12">
                <div className="section-header-with-count">
                    <h2 className="text-2xl font-bold">Pending Products ({pendingProducts.length})</h2>
                </div>
                <div className="space-y-4">
                    {pendingProducts.length === 0 && <EmptyState message="No pending products for review" icon={InboxIcon} />}
                    {pendingProducts.map((product) => (
                        <AdminProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section className="my-12">
                <div className="section-header-with-count">
                    <h2 className="text-2xl font-bold">All Products ({allProducts.length})</h2>
                </div>
                <div className="space-y-4">
                    {allProducts.map((product) => (
                        <AdminProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </>
    );
}

export default AdminPage;