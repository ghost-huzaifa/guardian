"use client";

import { useAuthStore } from "@/lib/auth-store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useHydrated } from "@/hooks/use-hydrated";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { token } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const hydrated = useHydrated();

    useEffect(() => {
        if (hydrated && !token) {
            router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }, [token, router, pathname, hydrated]);

    if (!hydrated || (!token && hydrated)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg-primary">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent-purple border-t-transparent"></div>
            </div>
        );
    }

    return <>{children}</>;
}
