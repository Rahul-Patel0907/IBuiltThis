'use client';
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { BuildingIcon, Building2Icon, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";


export default function CustomUserButton() {
    return (
        <UserButton>

            <UserButton.UserProfilePage label="Organizations" labelIcon={<BuildingIcon className="size-4" />} url="organization">
                <div className="p-4">
                    <h2>Manage Organization</h2>
                    <OrganizationSwitcher hidePersonal={true}
                        afterCreateOrganizationUrl={"/submit"}
                        afterSelectPersonalUrl={"/submit"}
                        appearance={{
                            elements: {
                                rootBox: "w-full",

                            }
                        }} />
                </div>
            </UserButton.UserProfilePage>

            <UserButton.UserProfilePage label="Admin" labelIcon={<Building2Icon className="size-4" />} url="/admin">
                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Admin Dashboard</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Access authoritative tools to manage products, review submissions, and oversee platform activity.
                        </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-md text-primary">
                                <Building2Icon className="size-5" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Privileged Access</p>
                                <p className="text-xs text-muted-foreground">You have admin permissions</p>
                            </div>
                        </div>
                        <Button
                            className="w-full gap-2"
                            size="lg"
                            onClick={() => window.location.href = "/admin"}
                        >
                            <LayoutDashboard className="size-4" />
                            Open Admin Panel
                        </Button>
                    </div>
                </div>
            </UserButton.UserProfilePage>
        </UserButton>
    )
}