import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods0 } from '.';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/sign_up';
  const POST = 'POST';

  return {
    /**
     * @param option.body - ユーザー登録リクエスト
     * @returns OK
     */
    post: (option: {
      body: Methods0['post']['reqBody'];
      config?: T | undefined;
    }) =>
      fetch<
        Methods0['post']['resBody'],
        BasicHeaders,
        Methods0['post']['status']
      >(prefix, PATH0, POST, option).json(),
    /**
     * @param option.body - ユーザー登録リクエスト
     * @returns OK
     */
    $post: (option: {
      body: Methods0['post']['reqBody'];
      config?: T | undefined;
    }) =>
      fetch<
        Methods0['post']['resBody'],
        BasicHeaders,
        Methods0['post']['status']
      >(prefix, PATH0, POST, option)
        .json()
        .then((r) => r.body),
    $path: () => `${prefix}${PATH0}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
