/* eslint-disable */
import type { ReadStream } from 'fs';
import type * as Types from '../@types';

export type Methods = {
  get: {
    query?:
      | {
          /** limit */
          limit?: string | undefined;
          /** offset */
          offset?: string | undefined;
          /** userId */
          userId?: string | undefined;
        }
      | undefined;

    status: 200;
    /** OK */
    resBody: Types.Controller_GetPostsResponse;
  };

  post: {
    status: 200;
    reqFormat: FormData;

    reqBody: {
      /** 画像ファイル */
      file: File | ReadStream;
      content: string;
    };
  };
};
