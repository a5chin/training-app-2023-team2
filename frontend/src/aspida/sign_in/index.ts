/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
  post: {
    status: 200;
    /** OK */
    resBody: Types.Entity_User;
    /** ユーザーログインリクエスト */
    reqBody: Types.Controller_SignInRequest;
  };
};
