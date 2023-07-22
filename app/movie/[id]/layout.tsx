import { Movie } from "@/app/interfaces";
import Image from "next/image";
import React, { ReactNode } from "react";

const getData = async (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.THEMOVIEDATABASE_API as string,
    },
    next: {
        revalidate: 60
    }
  };

  const res = await fetch(url, options);
  return res.json();
};

async function MovieDetail({ params,children }: { children: ReactNode,  params: { id: string } }) {
  const data: Movie = await getData(params.id);
  return (
    <div className="min-h-screen p-10">
      <div className="h-[40vh] relative">
        <Image
          className="object-cover w-full rounded-lg object-center"
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt="The banner of movie"
          fill
        />
      </div>
      <h1 className="text-4xl text-teal-600 pt-5 font-bold text-center" >{data.title}</h1>

      <div className="flex gap-x-10  mt-10 " >
        <div className="w-1/2 font-medium bg-gray-100 p-2 rounded-lg">
           
            <h1> <span className="underline text-teal-800  text-lg font-bold" >Tag line:</span> {data.tagline}</h1>
            <p><span className="underline text-teal-800 text-lg font-bold " >Overview:</span> {data.overview}</p>
            <p><span className="underline text-teal-800 text-lg font-bold " >Release Date:</span> {data.release_date}</p>
        </div>
        <div className="w-1/2 font-medium bg-gray-100">
            {children}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
