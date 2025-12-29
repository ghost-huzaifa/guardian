import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";

interface AppShellProps {
    children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="flex min-h-screen bg-bg-primary text-text-primary">
            <Sidebar />

            <main className="flex-1 overflow-y-auto pb-24 md:pb-8">
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
                    {children}
                </div>
            </main>

            <MobileNav />
        </div>
    );
}
