type AnimeType = {
  id:number,
  type:string,
  links: {
    self:string
  },
  attributes: {
    createdAt: Date,
    updateAt: Date,
    slug:string,
    synopsis: string,
    description:string,
    coverImageTopOffset:number,
    titles: {
      en:string,
      en_jp:string,
      en_us:string,
      ja_jp:string
    },
    canonicalTitle:string,
    averageRating:number,
    starDate: Date,
    endDate: Date
    status:string,
    posterImage: {
      tiny:string,
      large:string
    },
    youtubeVideoId:string,
    episodeCount:number,
    showType:string
  }
}

export default AnimeType