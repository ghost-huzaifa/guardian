"use client";

import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useHydrated } from "@/hooks/use-hydrated";

export function GuestGuard({ children }: { children: React.ReactNode }) {
    const { token } = useAuthStore();
    const router = useRouter();
    const hydrated = useHydrated();

    useEffect(() => {
        if (hydrated && token) {
            router.replace("/dashboard");
        }
    }, [token, router, hydrated]);

    if (!hydrated || (token && hydrated)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg-primary">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent-purple border-t-transparent"></div>
            </div>
        );
    }

    return <>{children}</>;
}
