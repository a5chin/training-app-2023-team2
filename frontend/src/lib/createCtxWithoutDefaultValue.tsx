import { createContext, useContext } from 'react';

// TypeScript で useContext の返り値に undefined を含めないために useContext を wrap している
// https://qiita.com/johnmackay150/items/88654e5064290c24a32a
function createCtxWithoutDefaultValue<ContextType>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export { createCtxWithoutDefaultValue };
