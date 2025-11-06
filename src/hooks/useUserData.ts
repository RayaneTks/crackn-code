import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserProfile } from "@/types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

// Fonction pour mapper les données utilisateur
const mapUserData = (data: any): UserProfile | null => {
  if (!data?.authenticated || !data?.user) return null;

  const baseUser = data.user;
  const xpGlobal = typeof baseUser.xp_global === "number" ? baseUser.xp_global : 0;
  const LEVEL_SIZE = 1000;
  const level = Math.floor(xpGlobal / LEVEL_SIZE) + 1;
  const currentXP = xpGlobal % LEVEL_SIZE;
  const xpToNextLevel = LEVEL_SIZE;
  const totalXP = xpGlobal;

  const mapped: UserProfile = {
    id: baseUser.id,
    username: baseUser.username,
    level,
    currentXP,
    xpToNextLevel,
    totalXP,
    completedChallenges: baseUser.completedChallenges ?? 0,
    achievements: baseUser.achievements ?? [],
  };

  const withAvatar = { ...(mapped as any), avatarOptions: baseUser.avatarOptions };
  return withAvatar as UserProfile;
};

// Hook pour récupérer les données utilisateur avec polling
export const useUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/me`, {
        credentials: "include",
      });
      if (!res.ok) return null;
      const data = await res.json();
      return mapUserData(data);
    },
    refetchInterval: 5000, // Actualise toutes les 5 secondes
    refetchIntervalInBackground: true, // Continue même si l'onglet n'est pas actif
    refetchOnWindowFocus: true, // Actualise quand on revient sur l'onglet
    staleTime: 0, // Les données sont toujours considérées comme périmées
    retry: 1,
  });
};

// Hook pour invalider et refetch les données utilisateur
export const useInvalidateUser = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };
};

