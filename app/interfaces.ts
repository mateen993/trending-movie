export interface Trending {
    results: {
        id: number,
        title: string,
        poster_path: string,
        overview: string
    }[]
}

export interface Movie {
    title: string,
    backdrop_path: string,
    overview: string,
    release_date: string,
    vote_average: number,
    vote_count: number,
    tagline: string,
    homepage: string
}