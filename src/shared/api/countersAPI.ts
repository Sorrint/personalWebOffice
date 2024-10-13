import { rtkApi } from './rtkApi';

const countersApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getCounter: build.query<number, string>({
      query: name => ({
        url: `counters/${name}`,
        method: 'GET',
      }),
    }),
  }),
});

export const useGetCounter = countersApi.useGetCounterQuery;
