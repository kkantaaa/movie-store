import axios from "axios";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import NavBar from "../components/NavBar";
import { useGlobalContext } from "../Contexts/GlobalContext";

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
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState();
  const { cart, setCart } = useGlobalContext();
  const [query, setQuery] = useState("");

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

      const cartJSON = JSON.stringify(updatedCart); // Corrected line
      localStorage.setItem("cart", cartJSON);
    } else {
      setCart([...cart, data]);

      const cartJSON = JSON.stringify([...cart, data]); // Store updated cart with the new movie
      localStorage.setItem("cart", cartJSON);
    }
  }

  const getData = async () => {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=a || ${query}`,
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
    const cartJSON = localStorage.getItem("cart");
    if (cartJSON) {
      setCart(JSON.parse(cartJSON));
    }
    console.log(movies);
    console.log({ cart: cart });
  }, [query]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-[#0d253f] to-white ">
      <NavBar prop={cart} />
      {loading ? (
        <p className="h-20 text-Headline6 text-DarkGray font-Montserrat font-medium animate-pulse">
          Loading . . .
        </p>
      ) : error ? (
        <p>Error occurred: {error.message}</p>
      ) : (
        <div className="flex flex-col items-center px-[250px]  ">
          <div className="search-box bg-[#0d253f] w-full relative flex flex-col justify-center items-center">
            <img
              className="z-1 grayscale brightness-50  contrast-130 saturate-30 bg-radi  object-cover w-[800px] h-[350px] "
              src="https://image.tmdb.org/t/p/w1280/2X5nnvkWvYRFmTspXY7lsJqDzog.jpg"
              alt="Through My Window: Across the Sea - backdrop"
            />
            <div className="shadow z-2 object-cover w-full h-full absolute bg-gradient-to-r from-[#0d253f] from-25%  via-[#0a69b186] to-[#0d253f] to-75% left-0 top-0"></div>
            <form className="z-3 absolute mt-[250px] w-full px-[10%]">
              <input
                className="w-full h-[48px] rounded-full px-[30px] "
                id="input-text-filter"
                type="text"
                placeholder="Search for a movie"
                    value={query}
                    onChange={(e)=>{setQuery(e.target.value)}}
              />
            
            </form>
          </div>
          <div className=" w-full grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 my-[20px]">
            {movies.map((movie) => (
              <div
                className="bg-white rounded-[8px] w-[230px] h-[460px] m-[10px] px-[14px] py-[16px] flex flex-col items-center justify-between"
                key={movie.id}
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <img
                      className="rounded-[8px]"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    />
                    <h1 className="my-[8px] font-medium text-[14px]">{movie.title}</h1>
                    <h2 className=" font-light text-[14px]">
                      {formatDate(movie.release_date)}
                    </h2>
                  </HoverCardTrigger>
                  <div className="w-full flex flex-row justify-between items-end text-[#feba3d]">
                    <div className="flex 0 mb-[5px]">
                      <svg
                        className="mt-[3px] mx-[5px] "
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
                        {cart &&
                        cart.find(
                          (movieOnCart) =>
                            movieOnCart && movieOnCart.id === movie.id
                        ) !== undefined ? (
                          <Button
                            disabled
                            variant="outline"
                            className="bg-[#feba3d] text-white rounded-full"
                          >
                            on Cart
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="bg-[#feba3d] text-white rounded-full"
                          >
                            Add to Cart
                          </Button>
                        )}
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <div className="flex flex-col items-center">
                          <img
                            className="rounded-[8px] w-[250px]"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          />
                          <h1 className="my-[8px] font-medium">
                            {movie.title}
                          </h1>
                          <div className="flex justify-evenly items-center w-full">
                            <DialogHeader>
                              <DialogTitle>Add Price</DialogTitle>
                            </DialogHeader>{" "}
                            <Input
                              id="name"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              className="w-[70%] rounded-[8px]"
                            />
                          </div>

                          <div className="w-full ">
                            <DialogClose asChild>
                              <Button
                                className="bg-[#fc6131e8] text-white rounded-full w-[80px] mt-[10px] ml-[78%] hover:bg-[#fc6031ab]"
                                onClick={() => {
                                  addCart({
                                    ...movie,
                                    price: price,
                                    quantity: 1,
                                  });
                                }}
                              >
                                Add
                              </Button>
                            </DialogClose>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <HoverCardContent className="bg-[#0a141f] text-white border-none rounded-[10px] w-[500px] h-[100] flex justify-between">
                    <div>
                      <CircularProgress
                        size="50px"
                        value={movie.vote_average * 10}
                        color="green.400"
                      >
                        <CircularProgressLabel fontSize="10px">
                          {parseInt(movie.vote_average * 10)} %
                        </CircularProgressLabel>
                      </CircularProgress>
                    </div>

                    <div className="w-[86%]">
                      <h1 className="font-medium mb-[8px]">Overview</h1>
                      <p className="font-light text-[14px]">{movie.overview}</p>
                    </div>
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
