import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/store/useAuthStore"

export const useGetAuthUser = () => {

    const { checkAuth } = useAuthStore();

    return useQuery({
        queryKey: ["users"],
        queryFn: () => checkAuth,
    });
};
