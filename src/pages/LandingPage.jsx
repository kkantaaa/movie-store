import axios from "axios";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/lib/utils/ui/hover-card";

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatDate(inputDate) {
    const parsedDate = parseISO(inputDate);
    const formattedDate = format(parsedDate, "MMM dd, yyyy");
    return formattedDate;
  }

  const getData = async () => {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=a`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWFmZTA5ZDZjNDczYmYwMzg3MzAyYzgxYmJmYzIzMCIsInN1YiI6IjY1MmZmMGU5ZWE4NGM3MDBlYmEzZjliYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QiADXSdSJq7kydJHFqacwpxCVukDfpWaa9hsSoaH3d4",
          },
        }
      );
      setMovies(result.data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    console.log(movies);
  }, []);

  return (
    <div className="w-full bg-with ">
      {loading ? (
        <p className="h-20 text-Headline6 text-DarkGray font-Montserrat font-medium animate-pulse">
          Loading . . .
        </p>
      ) : error ? (
        <p>Error occurred: {error.message}</p>
      ) : (
        <div className="">
          <div className="flex flex-wrap">
            {movies.map((movie) => (
              <div
                className="bg-green-300 w-[200px] h-[350px] m-[10px] p-[10px] flex flex-col items-center"
                key={movie.id}
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <img
                      className="h-[250px]"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    />
                    <h1>{movie.title}</h1>
                            <h2>{formatDate(movie.release_date)}</h2>
                            <div>
                                <h2>User Score</h2>
                            </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p>{movie.overview}</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
