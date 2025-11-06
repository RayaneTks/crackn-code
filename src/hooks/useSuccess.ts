import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

interface Success {
  id: number;
  image: string;
}

interface SuccessResponse {
  achievements: Success[];
}

// Hook pour récupérer les succès
export const useSuccess = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["success"],
    queryFn: async (): Promise<Success[]> => {
      const res = await fetch(`${API_BASE}/api/achievements`, {
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Failed to fetch achievements:", res.status, res.statusText);
        return [];
      }
      const data = await res.json();
      return data.achievements || [];
    },
    enabled,
    refetchInterval: 10000, // Actualise toutes les 10 secondes
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    retry: 1,
  });
};

