import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods0 } from '.';
import type { Methods as Methods1 } from './_userId@string';
import type { Methods as Methods2 } from './me';
import type { Methods as Methods3 } from './me/profile';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/users';
  const PATH1 = '/users/me';
  const PATH2 = '/users/me/profile';
  const GET = 'GET';
  const PUT = 'PUT';

  return {
    _userId: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`;

      return {
        /**
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, prefix0, GET, option).json(),
        /**
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, prefix0, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      };
    },
    me: {
      profile: {
        put: (option: {
          body: Methods3['put']['reqBody'];
          config?: T | undefined;
        }) =>
          fetch<void, BasicHeaders, Methods3['put']['status']>(
            prefix,
            PATH2,
            PUT,
            option,
            'FormData'
          ).send(),
        $put: (option: {
          body: Methods3['put']['reqBody'];
          config?: T | undefined;
        }) =>
          fetch<void, BasicHeaders, Methods3['put']['status']>(
            prefix,
            PATH2,
            PUT,
            option,
            'FormData'
          )
            .send()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH2}`,
      },
      /**
       * @returns OK
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods2['get']['resBody'],
          BasicHeaders,
          Methods2['get']['status']
        >(prefix, PATH1, GET, option).json(),
      /**
       * @returns OK
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods2['get']['resBody'],
          BasicHeaders,
          Methods2['get']['status']
        >(prefix, PATH1, GET, option)
          .json()
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
