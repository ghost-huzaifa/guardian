import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    userId: string;
    email: string;
    firstName: string;
    lastName?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (user, token) => {
                localStorage.setItem('accessToken', token);
                set({ user, token });
            },
            logout: () => {
                localStorage.removeItem('accessToken');
                set({ user: null, token: null });
            },
        }),
        {
            name: 'guardian-auth',
        }
    )
);
