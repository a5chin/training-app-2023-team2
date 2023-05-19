import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods0 } from '.';
import type { Methods as Methods1 } from './_postId@string';
import type { Methods as Methods2 } from './_postId@string/favorites';
import type { Methods as Methods3 } from './_postId@string/favorites/_favoriteId@string';
import type { Methods as Methods4 } from './_postId@string/replies';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/posts';
  const PATH1 = '/favorites';
  const PATH2 = '/replies';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';

  return {
    _postId: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`;

      return {
        favorites: {
          _favoriteId: (val2: string) => {
            const prefix2 = `${prefix0}${PATH1}/${val2}`;

            return {
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods3['delete']['status']>(
                  prefix,
                  prefix2,
                  DELETE,
                  option
                ).send(),
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods3['delete']['status']>(
                  prefix,
                  prefix2,
                  DELETE,
                  option
                )
                  .send()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix2}`,
            };
          },
          post: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods2['post']['status']>(
              prefix,
              `${prefix0}${PATH1}`,
              POST,
              option
            ).send(),
          $post: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods2['post']['status']>(
              prefix,
              `${prefix0}${PATH1}`,
              POST,
              option
            )
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH1}`,
        },
        replies: {
          /**
           * @returns OK
           */
          get: (
            option?:
              | {
                  query?: Methods4['get']['query'] | undefined;
                  config?: T | undefined;
                }
              | undefined
          ) =>
            fetch<
              Methods4['get']['resBody'],
              BasicHeaders,
              Methods4['get']['status']
            >(prefix, `${prefix0}${PATH2}`, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (
            option?:
              | {
                  query?: Methods4['get']['query'] | undefined;
                  config?: T | undefined;
                }
              | undefined
          ) =>
            fetch<
              Methods4['get']['resBody'],
              BasicHeaders,
              Methods4['get']['status']
            >(prefix, `${prefix0}${PATH2}`, GET, option)
              .json()
              .then((r) => r.body),
          post: (option: {
            body: Methods4['post']['reqBody'];
            config?: T | undefined;
          }) =>
            fetch<void, BasicHeaders, Methods4['post']['status']>(
              prefix,
              `${prefix0}${PATH2}`,
              POST,
              option,
              'FormData'
            ).send(),
          $post: (option: {
            body: Methods4['post']['reqBody'];
            config?: T | undefined;
          }) =>
            fetch<void, BasicHeaders, Methods4['post']['status']>(
              prefix,
              `${prefix0}${PATH2}`,
              POST,
              option,
              'FormData'
            )
              .send()
              .then((r) => r.body),
          $path: (
            option?:
              | { method?: 'get' | undefined; query: Methods4['get']['query'] }
              | undefined
          ) =>
            `${prefix}${prefix0}${PATH2}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        /**
         * get post by id
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, prefix0, GET, option).json(),
        /**
         * get post by id
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
        delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(
            prefix,
            prefix0,
            DELETE,
            option
          ).send(),
        $delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(
            prefix,
            prefix0,
            DELETE,
            option
          )
            .send()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      };
    },
    /**
     * @returns OK
     */
    get: (
      option?:
        | {
            query?: Methods0['get']['query'] | undefined;
            config?: T | undefined;
          }
        | undefined
    ) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option).json(),
    /**
     * @returns OK
     */
    $get: (
      option?:
        | {
            query?: Methods0['get']['query'] | undefined;
            config?: T | undefined;
          }
        | undefined
    ) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option)
        .json()
        .then((r) => r.body),
    $path: (
      option?:
        | { method?: 'get' | undefined; query: Methods0['get']['query'] }
        | undefined
    ) =>
      `${prefix}${PATH0}${
        option && option.query ? `?${dataToURLString(option.query)}` : ''
      }`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
