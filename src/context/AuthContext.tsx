import { createContext, useContext, useMemo, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUserData, useInvalidateUser } from "@/hooks/useUserData";
import type { UserProfile } from "@/types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

type AuthState = {
	user: UserProfile | null;
	loading: boolean;
	loginWithGoogle: () => void;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const { data: user, isLoading: loading } = useUserData();
	const queryClient = useQueryClient();
	const invalidateUser = useInvalidateUser();

	const loginWithGoogle = () => {
		window.location.href = `${API_BASE}/auth/google`;
	};

	const logout = async () => {
		await fetch(`${API_BASE}/api/logout`, { method: "POST", credentials: "include" });
		// Invalide toutes les queries pour forcer la déconnexion
		queryClient.clear();
		invalidateUser();
	};

	const value = useMemo(
		() => ({ user: user || null, loading, loginWithGoogle, logout }),
		[user, loading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}

export function RequireAuth({ children }: { children: ReactNode }) {
	const { user, loading } = useAuth();
	if (loading) return null;
	if (!user) return null;
	return <>{children}</>;
}


