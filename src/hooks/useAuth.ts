import { useAppSelector } from "@/store"

export const useAuth = () => {
    const { profile, isAuthenticated } = useAppSelector((state) => state.auth);
    const userId = profile?.id || null;

    return {
        userId,
        profile,
        isAuthenticated
    };
};

export default useAuth;