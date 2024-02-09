/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiUrl } from "../constants";

async function dataFetcher(queries:string[]):Promise<any> {
  const promiseCreator = async (query:string, retryCount: number = 0):Promise<any> => {
    const response = await fetch(`${apiUrl}${query}`)

    if(!response.ok) {
      if(response.status === 429 && retryCount < 3) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return promiseCreator(query, retryCount + 1);
      }
    }
    return await response.json();
  }
  
  const promiseArray = queries.map(query => promiseCreator(query));
    
  return Promise.all(promiseArray).then(res => {
    if(res.length === 1) return [...res[0].data];
    const data = [];

    for(let i = 0; i < res.length; i++) {
      data.push(...res[i].data)
    }

    return data;
  });
}

export default dataFetcher;