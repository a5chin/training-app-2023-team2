/* eslint-disable */
import type * as Types from '../../@types';

export type Methods = {
  /** get post by id */
  get: {
    status: 200;
    /** OK */
    resBody: Types.Entity_Post;
  };

  delete: {
    status: 204;
  };
};
