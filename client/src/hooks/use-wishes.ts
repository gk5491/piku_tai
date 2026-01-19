import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Wish } from "@shared/routes";
import type { InsertWish } from "@shared/schema";

// GET /api/wishes
export function useWishes() {
  return useQuery({
    queryKey: [api.wishes.list.path],
    queryFn: async () => {
      const res = await fetch(api.wishes.list.path);
      if (!res.ok) throw new Error("Failed to fetch wishes");
      return api.wishes.list.responses[200].parse(await res.json());
    },
  });
}

// POST /api/wishes
export function useCreateWish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertWish) => {
      const validated = api.wishes.create.input.parse(data);
      const res = await fetch(api.wishes.create.path, {
        method: api.wishes.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.wishes.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send wish");
      }
      return api.wishes.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.wishes.list.path] });
    },
  });
}
