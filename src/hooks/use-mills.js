import { getMills } from "@/services/mill.service";
import { useQuery } from "@tanstack/react-query";

export const useFetchMills = (payload) => {
    return useQuery({
      queryKey: ["mills", payload],
      queryFn: () => getMills(payload),
    });
};