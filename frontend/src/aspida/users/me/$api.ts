import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods0 } from '.';
import type { Methods as Methods1 } from './profile';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/users/me';
  const PATH1 = '/users/me/profile';
  const GET = 'GET';
  const PUT = 'PUT';

  return {
    profile: {
      put: (option: {
        body: Methods1['put']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<void, BasicHeaders, Methods1['put']['status']>(
          prefix,
          PATH1,
          PUT,
          option,
          'FormData'
        ).send(),
      $put: (option: {
        body: Methods1['put']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<void, BasicHeaders, Methods1['put']['status']>(
          prefix,
          PATH1,
          PUT,
          option,
          'FormData'
        )
          .send()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    /**
     * @returns OK
     */
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option).json(),
    /**
     * @returns OK
     */
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option)
        .json()
        .then((r) => r.body),
    $path: () => `${prefix}${PATH0}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
