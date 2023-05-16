import React, { createContext, useContext, useState } from 'react';
import { isAxiosError } from 'axios';
import { useCookies } from 'react-cookie';
import {
  SigninDTO,
  SignupDTO,
  User,
  signup as callSignupApi,
  signin as callSigninApi,
} from '@/features/auth';
import { ErrorResponseType } from '@/types';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [, , removeCookie] = useCookies(['authorization']);

  const signup = async (data: SignupDTO) => {
    try {
      const userData = await callSignupApi(data);
      setUser(userData);
    } catch (e) {
      if (isAxiosError<ErrorResponseType>(e)) {
        console.error(`error: ${e.response?.data}`);
      }
    }
  };

  const signin = async (data: SigninDTO) => {
    try {
      const userData = await callSigninApi(data);
      setUser(userData);
    } catch (e) {
      if (isAxiosError<ErrorResponseType>(e)) {
        console.error(`error: ${e.response?.data}`);
      }
    }
  };

  const signout = () => {
    removeCookie('authorization');
  };

  return { signin, signup, signout, currentUser: user };
};

type IAuthContext = {
  signin: (data: SigninDTO) => Promise<void>;
  signup: (data: SignupDTO) => Promise<void>;
  signout: () => void;
  currentUser: User | null;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const useAuthContext = () => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};
function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { useAuthContext, AuthProvider };
