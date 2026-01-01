import { GuestGuard } from "@/components/auth/guest-guard";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GuestGuard>
            <div className="flex min-h-screen items-center justify-center bg-bg-primary p-4">
                {/* Decorative background blobs */}
                <div className="fixed -left-20 top-20 h-72 w-72 rounded-full bg-accent-purple/10 blur-3xl" />
                <div className="fixed -right-20 bottom-20 h-96 w-96 rounded-full bg-accent-blue/10 blur-3xl" />

                <div className="relative w-full max-w-md">
                    {children}
                </div>
            </div>
        </GuestGuard>
    );
}
