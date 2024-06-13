import PQueue from 'p-queue';
import { useEffect } from 'react';

type Fetcher = (url: string) => Promise<any>;
const queue = new PQueue({ interval: 1800, intervalCap: 3 }); 

const fetcher = (url: string) => 
  queue.add(async () => {
    const controller = new AbortController()
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
    
);

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
      setTimeout(() => revalidate({ retryCount }), 100);
    }
  },
  refreshInterval: 3000,
  dedupingInterval: 600000,
};

export default swrConfig;
