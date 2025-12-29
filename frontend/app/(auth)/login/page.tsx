import { Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
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

            <form className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                        Email Scroll
                    </label>
                    <input
                        type="email"
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
                        placeholder="••••••••"
                        className="w-full rounded-xl border-2 border-white/10 bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted/50 focus:border-accent-purple focus:outline-none focus:ring-4 focus:ring-accent-purple/10"
                    />
                </div>

                <button
                    type="button"
                    className="group relative w-full overflow-hidden rounded-xl bg-accent-purple py-3.5 font-display text-lg font-bold text-bg-primary transition-transform active:scale-95"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Enter World <Sparkles className="h-5 w-5" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-0" />
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
