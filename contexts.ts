import { createContext } from 'react';

interface UserContextType {
  currentUser: any | null;
  alternateUsers: any | null;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  alternateUsers: null,
  isLoading: false,
});
