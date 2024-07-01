type entry = {
  mal_id: number,
  type: string,
  name: string,
  url: string
}

type RelationsType =  {
  relation: string,
  entry: entry[]
}

export default RelationsType;