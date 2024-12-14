export interface Song {
    id: number
    title: string
    artist: string
    measures: Measure[]
    sections: Section[]
}

export interface Measure {
    id: number
    song_id: number
    measure_number: number
    lyrics: string
    chords: string
}

export interface Section {
    id: number
    song_id: number
    section_name: string
    start_measure: number
    end_measure: number
}