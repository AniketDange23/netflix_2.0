import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { ToastContainer } from "react-toastify";

const imgUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "322fb03e52f15b9f7c9ac373ffe0142d"; // Replace with your actual TMDb API key

const Card = ({ img, id, title }) => {
  return (
    <div className="relative card p-2  hover:bg-slate-950 rounded-lg ">
      <img
        src={img}
        className="card-image"
        alt="card-img"
        style={{
          maxWidth: "200px",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "10px",
          transition: "all 0.3s ease-in-out",
          cursor: "pointer",
          height: "auto",
        }}
      />

      <Link
        to={`/movie/${id}`}
        className="card-overlay flex"
        aria-label={title}
      >
        <div className="flex  items-center">
          <span className="text-white text-sm flex gap-2 items-center p-2 ">
            Watch Now
            <BsPlayFill className="play-icon" />
          </span>
        </div>
      </Link>
    </div>
  );
};

const Row = ({ title, arr }) => (
  <div className="row mt-8 mb-12 px-10 ">
    <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
    <div className="flex  overflow-auto space-x-6 scrollbar-hide">
      {arr.map((item) => (
        <Card
          key={item.id}
          img={`${imgUrl}/${item.poster_path}`}
          id={item.id}
          title={item.title}
        />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcomingResponse = axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
        );
        const nowPlayingResponse = axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
        );
        const topRatedResponse = axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
        );
        const popularResponse = axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const genresResponse = axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );

        const [
          upcoming,
          nowPlaying,
          topRated,
          popular,
          genresData,
        ] = await Promise.all([
          upcomingResponse,
          nowPlayingResponse,
          topRatedResponse,
          popularResponse,
          genresResponse,
        ]);

        // Simulate loading for 2 seconds
        setTimeout(() => {
          setUpcomingMovies(upcoming.data.results);
          setNowPlayingMovies(nowPlaying.data.results);
          setTopRatedMovies(topRated.data.results);
          setPopularMovies(popular.data.results);
          setGenres(genresData.data.genres);
          setLoading(false); // Set loading to false when all data is fetched
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true); // Set error to true on error
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingPage />; // Show loading indicator while fetching data

  if (error) return <ErrorPage />; // Show error page if there's an error

  return (
    <section className=" text-white min-h-screen">
      <div
        className="banner relative  bg-cover h-[400px] bg-center  "
        style={{
          
          backgroundImage: upcomingMovies[0]
            ? `url(${imgUrl}/${upcomingMovies[0].backdrop_path})`
            : "none",
            
        }}
      >      </div>

        <div className="banner-content  px-20 m-auto  absolute top-0 text-white  mx-auto py-44 ">
          {upcomingMovies[0] && (
            <div className=" ">
              <h1 className="text-4xl font-bold mb-4">
                {upcomingMovies[0].original_title}
              </h1>
              <p className="text-lg mb-4">{upcomingMovies[0].overview}</p>
              <div className="btn flex">
                <button className="flex items-center bg-red-700 hover:bg-red-900 text-white font-normal py-2 px-4 rounded-lg mr-2">
                  <BsPlayFill className="mr-2" /> Play
                </button>
                <button className="flex items-center bg-black hover:bg-gray-800 text-white font-normal py-2 px-4 rounded-lg mr-2">
                  <AiOutlinePlus className="mr-2" /> My List
                </button>
              </div>
            </div>
          )}
        </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Top Rated Movies"} arr={topRatedMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular Movies"} arr={popularMovies} />

      <div className="genre-box   px-5 py-2">
        <h2 className="text-2xl font-semibold text-white mb-4">Genres</h2>
        <div className="flex  overflow-x-scroll scrollbar-hide gap-4">
          {genres.map((item) => (
            <Link
              key={item.id}
              to={`/genre/${item.id}`}
              className="  bg-gray-900 px-5 pt-3 pb-0 text-center   items-center  rounded-2xl hover:text-blue-300 "
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Home;
