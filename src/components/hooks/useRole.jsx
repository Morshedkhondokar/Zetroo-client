import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "guest",
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !loading && !!user?.email, // wait until auth ready
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading, isError };
};

export default useRole;
