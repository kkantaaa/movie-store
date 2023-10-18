import axios from "axios";
import { useEffect, useState } from "react";

function LandingPage() {
    const [movies, setMovie] = useState({});
    
  const getData = async () => {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en', 10749`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWFmZTA5ZDZjNDczYmYwMzg3MzAyYzgxYmJmYzIzMCIsInN1YiI6IjY1MmZmMGU5ZWE4NGM3MDBlYmEzZjliYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QiADXSdSJq7kydJHFqacwpxCVukDfpWaa9hsSoaH3d4",
          },
        }
      );
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>hello world</div>;
}
export default LandingPage;
