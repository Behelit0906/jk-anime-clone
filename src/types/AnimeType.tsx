type AnimeType = {
  mal_id:number,
  images: {
    jpg:{
      image_url:string,
      small_image_url:string,
      large_image_url:string
    }
  }
  title:string,
  title_english:string,
  type:string,
  status: string,
  airing:boolean,
  aired: {
    from: string
    to: string
    prop: {
      from: {
        day:number,
        month: number,
        year: number
      },
      to: {
        day: number,
        month: number,
        year: number
      }
    },
  },
  rank: number,
  popularity: number,
  synopsis: string,
  genres: {
    mail_id: number,
    type: string,
    name: string,
  }[],
  broadcast: {
    day: string,
    time: string,
    timezone: string,
    string: string,
  }
  score:number
}

export default AnimeType