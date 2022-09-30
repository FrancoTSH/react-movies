import { AuthContext } from "context";
import { useContext } from "react";
import { useMutation } from "react-query";
import { AuthService, TokenService } from "services/auth";
import { User } from "types/user";

export function useAuth() {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const login = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      AuthService.login({ email, password }),
    {
      onSuccess: ({ user, accessToken, refreshToken }) => {
        setAuthenticatedUser(user);
        TokenService.updateLocalTokens({ accessToken, refreshToken });
      },
    },
  );

  const register = useMutation((data: Partial<User>) => AuthService.register(data), {
    onSuccess: ({ user, accessToken, refreshToken }) => {
      setAuthenticatedUser(user);
      TokenService.updateLocalTokens({ accessToken, refreshToken });
    },
  });

  const logout = useMutation(AuthService.logout, {
    onSuccess: () => {
      setAuthenticatedUser(null);
      TokenService.removeLocalTokens();
    },
  });

  return { authenticatedUser, login, register, logout };
}
