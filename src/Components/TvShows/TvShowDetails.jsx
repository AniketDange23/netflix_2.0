import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const imgUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "322fb03e52f15b9f7c9ac373ffe0142d";

const TvShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
        );
        setShowDetails(response.data);
        console.log("Fetched TV show details:", response.data);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (!showDetails) {
    return <p>Loading...</p>;
  }

  return (
    <section className="relative z-10 p-8 lg:p-32 bg-gray-900 text-white ">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${imgUrl}${showDetails.backdrop_path})` }}
      ></div>
      <div className="relative container mx-auto p-8 lg:p-16  bg-opacity-75 rounded-lg">
        <div className="grid grid-cols-1 gap-4">
          <div className="details-container">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              {showDetails.original_name}
            </h1>
            <p className="text-lg mb-6">{showDetails.overview}</p>
            <div className="info-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <strong className="text-gray-200">First air date:</strong> {showDetails.first_air_date}
              </div>
              <div>
                <strong className="text-gray-200">Vote average:</strong> {showDetails.vote_average}
              </div>
              <div>
                <strong className="text-gray-200">Popularity:</strong> {showDetails.popularity}
              </div>
              <div>
                <strong className="text-gray-200">Original language:</strong> {showDetails.original_language}
              </div>
              <div>
                <strong className="text-gray-200">Votes:</strong> {showDetails.vote_count}
              </div>
              <div>
                <strong className="text-gray-200">Number of seasons:</strong> {showDetails.number_of_seasons}
              </div>
              <div>
                <strong className="text-gray-200">Number of episodes:</strong> {showDetails.number_of_episodes}
              </div>
              <div>
                <strong className="text-gray-200">Production companies:</strong> {showDetails.production_companies.map(company => company.name).join(", ")}
              </div>
              <div>
                <strong className="text-gray-200">Networks:</strong> {showDetails.networks.map(network => network.name).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TvShowDetails;
