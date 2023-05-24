/* eslint-disable */
export type Controller_GetPostsResponse = {
  posts?: Entity_Post[] | undefined;
};

export type Controller_SignInRequest = {
  email?: string | undefined;
  password?: string | undefined;
};

export type Controller_SignUpRequest = {
  email?: string | undefined;
  name?: string | undefined;
  password?: string | undefined;
};

export type Entity_ErrorResponse = {
  message?: string | undefined;
};

export type Entity_HelloWorld = {
  lang?: string | undefined;
  message?: string | undefined;
};

export type Entity_Post = {
  body?: string | undefined;
  favorites_count?: number | undefined;
  id?: string | undefined;
  is_my_favorite?: boolean | undefined;
  parent?: Entity_Post | undefined;
  replies_count?: number | undefined;
  user?: Entity_User | undefined;
};

export type Entity_User = {
  email?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  profile?: string | undefined;
};
