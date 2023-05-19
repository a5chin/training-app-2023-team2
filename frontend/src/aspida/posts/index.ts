/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
  get: {
    query?:
      | {
          /** limit */
          limit?: string | undefined;
          /** offset */
          offset?: string | undefined;
        }
      | undefined;

    status: 200;
    /** OK */
    resBody: Types.Controller_GetPostsResponse;
  };
};
