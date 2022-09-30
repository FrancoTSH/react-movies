import { useState, createContext } from "react";
import { User } from "types/user";

interface IAuth {
  authenticatedUser: User | null;
  setAuthenticatedUser: (value: User | null) => void;
}

export const AuthContext = createContext<IAuth>({
  authenticatedUser: null,
  setAuthenticatedUser: () => {},
});

interface IProps {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
