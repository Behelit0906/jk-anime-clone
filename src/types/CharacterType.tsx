type CharacterType = {
  character: {
    mal_id: number,
    images: {
      jpg: {
        image_url: string
      },
      webp: {
        image_url: string
        small_image_url: string
      }
    },
    name: string
  },
  role: string,
}

export default CharacterType