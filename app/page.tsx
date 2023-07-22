import Image from "next/image";
import { Trending } from "./interfaces";
import Link from "next/link";

const getMovies = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.THEMOVIEDATABASE_API as string,
    },
    next: {
      revalidate: 10
     }
  };
  const url = "https://api.themoviedb.org/3/movie/top_rated";
  const res = await fetch(url, options);

  return res.json();
};

export default async function Home() {
  const data: Trending = await getMovies();
  return (
    <div className="bg-white py-6 md:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl  px-4 md:px-8">
        <div className="mb-10 md:mb-6">
          <h1 className="text-3xl text-center font-extrabold text-teal-600 mb-4 ">
            {" "}
            Top Trending movies{" "}
          </h1>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 xl:gap-8">
              {data.results.map((movie) => {
                return (
                  <div
                    key={movie.id}
                    className="flex flex-col rounded-lg overflow-hidden border bg-white"
                  >
                    <Link
                      className="group relative h-48 md:h-64 overflow-hidden rounded-lg bg-gray-100"
                      href={`/movie/${movie.id}`}
                    >
                      <Image
                        className="absolute h-full w-full inset-0 group-hover:scale-110 transition duration-200 "
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        width={500}
                        height={500}
                        alt="The movie banner"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-4 sm:p-6" >
                      <h2 className="mb-3 text-gray-800 font-extrabold text-lg hover:scale-105 hover:text-teal-500 active:text-teal-600 " > 
                      <Link  href={`/movie/${movie.id}`} > {movie.title} </Link>
                       </h2>
                      <p className="text-sm text-gray-600 line-clamp-3" >
                          {movie.overview}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
