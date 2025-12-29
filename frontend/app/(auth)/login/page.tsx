"use client";

import { Shield, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";

export default function LoginPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [email, setEmail] = useState("wizard@guardian.gg");
    const [password, setPassword] = useState("password123");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await apiFetch<any>('/auth/login', {
                method: 'POST',
                body: { email, password },
            });

            if (data.message) {
                // Handle the backend returning 200 with error message
                setError(data.message);
                setLoading(false);
                return;
            }

            setAuth(data.user, data.access_token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overflow-hidden rounded-3xl border-2 border-white/10 bg-bg-elevated p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-purple text-bg-primary shadow-lg shadow-accent-purple/20">
                    <Shield className="h-10 w-10 fill-current" />
                </div>
                <h1 className="font-display text-3xl font-bold text-text-primary">
                    Welcome back
                </h1>
                <p className="mt-2 text-text-muted">
                    Ready to level up your life?
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                        Email Scroll
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="wizard@guardian.gg"
                        className="w-full rounded-xl border-2 border-white/10 bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted/50 focus:border-accent-purple focus:outline-none focus:ring-4 focus:ring-accent-purple/10"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                        Secret Key
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border-2 border-white/10 bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted/50 focus:border-accent-purple focus:outline-none focus:ring-4 focus:ring-accent-purple/10"
                    />
                </div>

                {error && (
                    <div className="rounded-xl bg-accent-red/10 p-3 text-center text-sm font-bold text-accent-red">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full overflow-hidden rounded-xl bg-accent-purple py-3.5 font-display text-lg font-bold text-bg-primary transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Enter World <Sparkles className="h-5 w-5" /></>}
                    </span>
                    {!loading && <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-0" />}
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-text-muted">New player? </span>
                <Link href="/register" className="font-bold text-accent-pink hover:underline">
                    Create Character
                </Link>
            </div>
        </div>
    );
}
