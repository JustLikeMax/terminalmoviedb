"use server";

export default async function getFilm(title: string) {
    const response = await fetch(
        `http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}&plot=full`
    );
    const data = await response.json();

    if (data.Error) {
        return "film not found";
    }

    const film = {
        Title: data.Title,
        Year: data.Year,
        Released: data.Released,
        Runtime: data.Runtime,
        Genre: data.Genre,
        Director: data.Director,
        Writer: data.Writer,
        Actors: data.Actors,
        Plot: data.Plot,
        Poster: data.Poster,
    };

    console.log({ film });

    return film;
}
