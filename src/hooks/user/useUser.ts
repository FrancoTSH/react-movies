import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserService } from "services/user";
import { User } from "types/user";

export function useUser() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery(["profile"], UserService.getProfile);

  const updateProfile = useMutation((data: Partial<User>) => UserService.updateProfile(data), {
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  return {
    profile: { ...profileQuery, invalidate: queryClient.invalidateQueries(["profile"]) },
    updateProfile,
  };
}
