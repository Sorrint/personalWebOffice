import type {
  BaseQueryApi,
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type { DreamkasProduct } from '../types/DreamkasProduct';
import type { baseQueryAuth } from '@shared/lib/middlewares/authQueryMiddleware';
import { isProductsCacheValid, getAllCachedProducts, saveProducts } from '../../lib/productsCache';
import { baseDreamkasProductsUri } from '../productsDreamkasEndpoints';

type QueryBuilder = EndpointBuilder<typeof baseQueryAuth, 'products', 'api'>['query'];

const queryFn = async (
  _arg: void,
  _api: BaseQueryApi,
  _opts: Record<string, unknown>,
  baseQuery: (
    arg: string | FetchArgs,
  ) => ReturnType<BaseQueryFn<string | FetchArgs, DreamkasProduct[], FetchBaseQueryError>>,
) => {
  if (await isProductsCacheValid()) {
    const products = await getAllCachedProducts();
    return { data: products };
  }
  const result = await baseQuery({ url: `${baseDreamkasProductsUri}/all` });

  if (result.error) return { error: result.error };
  if (result.data && result.data.length > 0) {
    await saveProducts(result.data);
  }
  return { data: result.data };
};

export const loadAllProductsCached = (query: QueryBuilder) =>
  query<DreamkasProduct[], void>({ queryFn });
