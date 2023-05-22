import React, { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import {
  User,
  signup as callSignupApi,
  signin as callSigninApi,
  fetchMe,
  signout as callSignoutApi,
} from '@/features/auth';
import {
  Controller_SignInRequest as SigninDTO,
  Controller_SignUpRequest as SignupDTO,
} from '@/aspida/@types';
import { ErrorResponseType } from '@/types';
import { createCtxWithoutDefaultValue } from './createCtxWithoutDefaultValue';

type IAuthContext = {
  signin: (data: SigninDTO) => Promise<void>;
  signup: (data: SignupDTO) => Promise<void>;
  signout: () => void;
  currentUser: User | null;
};

const useAuthContext = (): IAuthContext => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const userData = await fetchMe();
        setUser(userData);
      } catch (e) {
        // ログインしていないケース
        if (isAxiosError<ErrorResponseType>(e)) {
          console.error(`error: ${JSON.stringify(e.response?.data)}`);
        }
      }
    };
    if (!user) {
      fetchAndSetUser();
    }
  }, [user]);

  const signup = async (data: SignupDTO) => {
    try {
      const userData = await callSignupApi(data);
      setUser(userData);
    } catch (e) {
      if (isAxiosError<ErrorResponseType>(e)) {
        console.error(`error: ${JSON.stringify(e.response?.data)}`);
      }
    }
  };

  const signin = async (data: SigninDTO) => {
    try {
      const userData = await callSigninApi(data);
      setUser(userData);
    } catch (e) {
      if (isAxiosError<ErrorResponseType>(e)) {
        console.error(`error: ${JSON.stringify(e.response?.data)}`);
      }
    }
  };

  const signout = async () => {
    try {
      await callSignoutApi();
      setUser(null);
    } catch (e) {
      if (isAxiosError<ErrorResponseType>(e)) {
        console.error(`error: ${JSON.stringify(e.response?.data)}`);
      }
    }
  };

  return { signin, signup, signout, currentUser: user };
};

const [useAuth, AuthContextProvider] =
  createCtxWithoutDefaultValue<IAuthContext>();

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuthContext();

  return <AuthContextProvider value={auth}>{children}</AuthContextProvider>;
}

export { useAuth, AuthProvider };
