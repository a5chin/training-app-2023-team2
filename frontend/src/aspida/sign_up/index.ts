/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
  post: {
    status: 200;
    /** OK */
    resBody: Types.Entity_User;
    /** ユーザー登録リクエスト */
    reqBody: Types.Controller_SignUpRequest;
  };
};
