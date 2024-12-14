import { Song } from "./song"

export interface SearchResponse {
    count: number
    songs: Song[]
  }
