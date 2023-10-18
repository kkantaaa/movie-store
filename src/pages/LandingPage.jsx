import axios from "axios";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/lib/utils/ui/hover-card";
import { Button } from "@/lib/utils/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/utils/ui/dialog";
import { Input } from "@/lib/utils/ui/input";
import { Label } from "@/lib/utils/ui/label";
import { da } from "date-fns/locale";

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState();
  const [cart, setCart] = useState([]);

  function formatDate(inputDate) {
    const parsedDate = parseISO(inputDate);
    const formattedDate = format(parsedDate, "MMM dd, yyyy");
    return formattedDate;
  }
  function addCart(data) {
    const existingMovie = cart.find((movie) => movie.id === data.id);
  
    if (existingMovie) {
      const updatedCart = cart.map((movie) =>
        movie.id === data.id ? { ...movie, amount: movie.amount + 1 } : movie
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, data]);
    }
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
    console.log({ cart: cart });
  }, [cart]);

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
          <div></div>
          <div className="flex flex-wrap">
            {movies.map((movie) => (
              <div
                className="bg-red-300 w-[200px] h-[400px] m-[10px] px-[14px] py-[16px] flex flex-col items-center justify-between"
                key={movie.id}
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <img
                      className="h-[250px]"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    />
                    <h1 className="my-[8px]">{movie.title}</h1>
                    <h2>{formatDate(movie.release_date)}</h2>
                  </HoverCardTrigger>
                  <div className="w-full flex flex-row justify-between items-end text-yellow-300">
                    <div className="flex">
                      <svg
                        className="mt-[2px] mx-[4px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        class="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <h2 className="text-[12px]">
                        {(movie.vote_average * 10).toFixed(2)} %
                      </h2>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Add to Cart</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add Price</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="col-span-3"
                          />
                          <DialogClose asChild>
                            <Button
                              onClick={() => {
                                addCart({ ...movie, price: price, amount: 1});
                              }}
                            >
                              Add
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
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
