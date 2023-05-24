import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods0 } from './hello';
import type { Methods as Methods1 } from './posts';
import type { Methods as Methods2 } from './posts/_postId@string';
import type { Methods as Methods3 } from './posts/_postId@string/favorites';
import type { Methods as Methods4 } from './posts/_postId@string/replies';
import type { Methods as Methods5 } from './sign_in';
import type { Methods as Methods6 } from './sign_out';
import type { Methods as Methods7 } from './sign_up';
import type { Methods as Methods8 } from './users';
import type { Methods as Methods9 } from './users/_userId@string';
import type { Methods as Methods10 } from './users/me';
import type { Methods as Methods11 } from './users/me/profile';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/hello';
  const PATH1 = '/posts';
  const PATH2 = '/favorites';
  const PATH3 = '/replies';
  const PATH4 = '/sign_in';
  const PATH5 = '/sign_out';
  const PATH6 = '/sign_up';
  const PATH7 = '/users';
  const PATH8 = '/users/me';
  const PATH9 = '/users/me/profile';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';
  const DELETE = 'DELETE';

  return {
    hello: {
      /**
       * get helloWorld message
       * @returns OK
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods0['get']['resBody'],
          BasicHeaders,
          Methods0['get']['status']
        >(prefix, PATH0, GET, option).json(),
      /**
       * get helloWorld message
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
    },
    posts: {
      _postId: (val1: string) => {
        const prefix1 = `${PATH1}/${val1}`;

        return {
          favorites: {
            post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods3['post']['status']>(
                prefix,
                `${prefix1}${PATH2}`,
                POST,
                option
              ).send(),
            $post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods3['post']['status']>(
                prefix,
                `${prefix1}${PATH2}`,
                POST,
                option
              )
                .send()
                .then((r) => r.body),
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods3['delete']['status']>(
                prefix,
                `${prefix1}${PATH2}`,
                DELETE,
                option
              ).send(),
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods3['delete']['status']>(
                prefix,
                `${prefix1}${PATH2}`,
                DELETE,
                option
              )
                .send()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH2}`,
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
              >(prefix, `${prefix1}${PATH3}`, GET, option).json(),
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
              >(prefix, `${prefix1}${PATH3}`, GET, option)
                .json()
                .then((r) => r.body),
            post: (option: {
              body: Methods4['post']['reqBody'];
              config?: T | undefined;
            }) =>
              fetch<void, BasicHeaders, Methods4['post']['status']>(
                prefix,
                `${prefix1}${PATH3}`,
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
                `${prefix1}${PATH3}`,
                POST,
                option,
                'FormData'
              )
                .send()
                .then((r) => r.body),
            $path: (
              option?:
                | {
                    method?: 'get' | undefined;
                    query: Methods4['get']['query'];
                  }
                | undefined
            ) =>
              `${prefix}${prefix1}${PATH3}${
                option && option.query
                  ? `?${dataToURLString(option.query)}`
                  : ''
              }`,
          },
          /**
           * get post by id
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods2['get']['resBody'],
              BasicHeaders,
              Methods2['get']['status']
            >(prefix, prefix1, GET, option).json(),
          /**
           * get post by id
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods2['get']['resBody'],
              BasicHeaders,
              Methods2['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods2['delete']['status']>(
              prefix,
              prefix1,
              DELETE,
              option
            ).send(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods2['delete']['status']>(
              prefix,
              prefix1,
              DELETE,
              option
            )
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      /**
       * @returns OK
       */
      get: (
        option?:
          | {
              query?: Methods1['get']['query'] | undefined;
              config?: T | undefined;
            }
          | undefined
      ) =>
        fetch<
          Methods1['get']['resBody'],
          BasicHeaders,
          Methods1['get']['status']
        >(prefix, PATH1, GET, option).json(),
      /**
       * @returns OK
       */
      $get: (
        option?:
          | {
              query?: Methods1['get']['query'] | undefined;
              config?: T | undefined;
            }
          | undefined
      ) =>
        fetch<
          Methods1['get']['resBody'],
          BasicHeaders,
          Methods1['get']['status']
        >(prefix, PATH1, GET, option)
          .json()
          .then((r) => r.body),
      post: (option: {
        body: Methods1['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<void, BasicHeaders, Methods1['post']['status']>(
          prefix,
          PATH1,
          POST,
          option,
          'FormData'
        ).send(),
      $post: (option: {
        body: Methods1['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<void, BasicHeaders, Methods1['post']['status']>(
          prefix,
          PATH1,
          POST,
          option,
          'FormData'
        )
          .send()
          .then((r) => r.body),
      $path: (
        option?:
          | { method?: 'get' | undefined; query: Methods1['get']['query'] }
          | undefined
      ) =>
        `${prefix}${PATH1}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    sign_in: {
      /**
       * @param option.body - ユーザーログインリクエスト
       * @returns OK
       */
      post: (option: {
        body: Methods5['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<
          Methods5['post']['resBody'],
          BasicHeaders,
          Methods5['post']['status']
        >(prefix, PATH4, POST, option).json(),
      /**
       * @param option.body - ユーザーログインリクエスト
       * @returns OK
       */
      $post: (option: {
        body: Methods5['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<
          Methods5['post']['resBody'],
          BasicHeaders,
          Methods5['post']['status']
        >(prefix, PATH4, POST, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH4}`,
    },
    sign_out: {
      post: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods6['post']['status']>(
          prefix,
          PATH5,
          POST,
          option
        ).send(),
      $post: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods6['post']['status']>(
          prefix,
          PATH5,
          POST,
          option
        )
          .send()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH5}`,
    },
    sign_up: {
      /**
       * @param option.body - ユーザー登録リクエスト
       * @returns OK
       */
      post: (option: {
        body: Methods7['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<
          Methods7['post']['resBody'],
          BasicHeaders,
          Methods7['post']['status']
        >(prefix, PATH6, POST, option).json(),
      /**
       * @param option.body - ユーザー登録リクエスト
       * @returns OK
       */
      $post: (option: {
        body: Methods7['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<
          Methods7['post']['resBody'],
          BasicHeaders,
          Methods7['post']['status']
        >(prefix, PATH6, POST, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH6}`,
    },
    users: {
      _userId: (val1: string) => {
        const prefix1 = `${PATH7}/${val1}`;

        return {
          /**
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods9['get']['resBody'],
              BasicHeaders,
              Methods9['get']['status']
            >(prefix, prefix1, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods9['get']['resBody'],
              BasicHeaders,
              Methods9['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      me: {
        profile: {
          put: (option: {
            body: Methods11['put']['reqBody'];
            config?: T | undefined;
          }) =>
            fetch<void, BasicHeaders, Methods11['put']['status']>(
              prefix,
              PATH9,
              PUT,
              option,
              'FormData'
            ).send(),
          $put: (option: {
            body: Methods11['put']['reqBody'];
            config?: T | undefined;
          }) =>
            fetch<void, BasicHeaders, Methods11['put']['status']>(
              prefix,
              PATH9,
              PUT,
              option,
              'FormData'
            )
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH9}`,
        },
        /**
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods10['get']['resBody'],
            BasicHeaders,
            Methods10['get']['status']
          >(prefix, PATH8, GET, option).json(),
        /**
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods10['get']['resBody'],
            BasicHeaders,
            Methods10['get']['status']
          >(prefix, PATH8, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH8}`,
      },
      /**
       * @returns OK
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods8['get']['resBody'],
          BasicHeaders,
          Methods8['get']['status']
        >(prefix, PATH7, GET, option).json(),
      /**
       * @returns OK
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods8['get']['resBody'],
          BasicHeaders,
          Methods8['get']['status']
        >(prefix, PATH7, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH7}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
