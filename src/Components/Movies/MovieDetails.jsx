import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const imgUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "322fb03e52f15b9f7c9ac373ffe0142d"; // Replace with your actual TMDb API key

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      console.log(`Fetching details for movie ID: ${id}`);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        console.log("Movie details fetched:", response.data);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative z-10 p-8 lg:p-32 bg-gray-900 text-white min-h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${imgUrl}${movie.backdrop_path})` }}
      ></div>
      <div className="relative container mx-auto p-8 lg:p-16   bg-opacity-75 rounded-lg">
        <div className="grid grid-cols-1 gap-3">
          <div className="details-container w-full">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              {movie.original_title}
            </h1>
            <p className="text-lg mb-6">{movie.overview}</p>
            <div className="info-grid grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              <div>
                <strong className="text-gray-200">Production Companies:</strong>{" "}
                {movie.production_companies.map((company) => company.name).join(", ")}
              </div>
              <div>
                <strong className="text-gray-200">Vote average:</strong>{" "}
                {movie.vote_average}
              </div>
              <div>
                <strong className="text-gray-200">Popularity:</strong>{" "}
                {movie.popularity}
              </div>
              <div>
                <strong className="text-gray-200">Original language:</strong>{" "}
                {movie.original_language}
              </div>
              <div>
                <strong className="text-gray-200">Release date:</strong>{" "}
                {movie.release_date}
              </div>
              <div>
                <strong className="text-gray-200">Votes:</strong>{" "}
                {movie.vote_count}
              </div>
              <div>
                <strong className="text-gray-200">Genres:</strong>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </div>
              <div>
                <strong className="text-gray-200">Runtime:</strong>{" "}
                {movie.runtime} minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
