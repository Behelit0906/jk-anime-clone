import PQueue from 'p-queue';

type Fetcher = (url: string) => Promise<any>;

const fetcher: Fetcher = (url: string) => fetch(url).then(res => res.json());

const queue = new PQueue({ interval: 2500, intervalCap: 2 });

const queuedFetcher:Fetcher = (url: string) => queue.add(() => fetcher(url));

type SWRConfig = {
  fetcher: Fetcher,
  onErrorRetry: (error: any, _key: string, _config: any, revalidate: (opts: { retryCount: number }) => void, context: { retryCount: number }) => void,
  refreshInterval: number,
  dedupingInterval: number,
};

export const swrConfig: SWRConfig = {
  fetcher: queuedFetcher,
  onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
    if (error.status === 404) return;
    if (error.status === 429 && retryCount < 3) {
      setTimeout(() => revalidate({ retryCount }), 2000);
    }
  },
  refreshInterval: 3000,
  dedupingInterval: 600000,
};

export default swrConfig;
