import React, { useEffect, useState } from 'react';
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
import { createCtxWithoutDefaultValue } from './createCtxWithoutDefaultValue';

type IAuthContext = {
  signin: (data: SigninDTO) => Promise<void>;
  signup: (data: SignupDTO) => Promise<void>;
  signout: () => void;
  currentUser: User | null;
};

const useAuth = (): IAuthContext => {
  const [user, setUser] = useState<User | null>(null);
  const [, , removeCookie] = useCookies(['authorization']);

  useEffect(() => {
    const f = async () => {
      try {
        // TODO: GET /user/me がまだ完成していないので実行しない
        console.log('Need to implement GET /users/me');
        // const userData = await fetchMe();
        // setUser(userData);
      } catch (e) {
        // ログインしていないケース
        if (isAxiosError<ErrorResponseType>(e)) {
          console.error(`error: ${e.response?.data}`);
        }
      }
    };
    f();
  }, [user]);

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

const [useAuthContext, AuthContextProvider] =
  createCtxWithoutDefaultValue<IAuthContext>();

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return <AuthContextProvider value={auth}>{children}</AuthContextProvider>;
}

export { useAuthContext, AuthProvider };
