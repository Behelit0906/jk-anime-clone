import PQueue from 'p-queue';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const queue = new PQueue({ interval: 2500, intervalCap: 2 });

const queuedFetcher = (url: string) => queue.add(() => fetcher(url));

export const swrConfig = {
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
