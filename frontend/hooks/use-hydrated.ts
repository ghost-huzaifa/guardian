import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";

export function useHydrated() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // This will only run on the client
        const unsubHydrate = useAuthStore.persist.onFinishHydration(() => setHydrated(true));

        // Check if already hydrated
        if (useAuthStore.persist.hasHydrated()) {
            setHydrated(true);
        }

        return () => unsubHydrate();
    }, []);

    return hydrated;
}
