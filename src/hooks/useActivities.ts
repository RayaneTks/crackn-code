import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

interface Activity {
  id: number;
  language_id: string;
  level_title: string;
  xp_earned: number;
  created_at: string;
}

// Hook pour récupérer les activités récentes
export const useActivities = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: async (): Promise<Activity[]> => {
      const res = await fetch(`${API_BASE}/api/activities`, {
        credentials: "include",
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data.activities || [];
    },
    enabled,
    refetchInterval: 10000, // Actualise toutes les 10 secondes
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    retry: 1,
  });
};

