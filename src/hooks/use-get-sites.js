import { getDumpSites } from "@/services/dumpsite.service";
import { useQuery } from "@tanstack/react-query";

export const useFetchDumpSites = (payload) => {
    return useQuery({
      queryKey: ["dumpsites", payload],
      queryFn: () => getDumpSites(payload),
    });
};