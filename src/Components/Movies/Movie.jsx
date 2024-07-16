import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './../ErrorPage';
import LoadingPage from './../LoadingPage';

const imgUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "322fb03e52f15b9f7c9ac373ffe0142d"; // Replace with your actual TMDb API key

const Card = ({ img, title, date, rating, id, movie, addToList }) => (
  <div className="relative rounded-lg p-3 m-2 flex-shrink-0 hover:scale-105 hover:bg-slate-950">
    <img src={img} alt="card-img" className="rounded-lg mb-3 max-w-[220px]" />
    <h3 className="text-lg text-white">{title}</h3>
    <p className="text-gray-400">{date}</p>
    <span className="text-black text-sm absolute top-4 p-1 right-5 rounded-md bg-yellow-500">Rating: {rating}</span>
    <div className="flex justify-between">
      <Link to={`/movie/${id}`} className="text-yellow-400 mt-2 block">
        More Details
      </Link>
      <button
        onClick={() => addToList(movie)}
        className="bg-yellow-500 text-black font-bold rounded p-2 w-auto"
      >
        +
      </button>
    </div>
  </div>
);

const Row = ({ title, description, arr, addToList }) => (
  <div className="mb-10">
    <h2 className="text-2xl text-white px-5 mb-3">{title}</h2>
    <p className="text-gray-400 px-5 mb-5">{description}</p>
    <div className="flex overflow-x-scroll scrollbar-hide">
      {arr.map((item) => (
        <Card
          key={item.id}
          img={`${imgUrl}${item.poster_path}`}
          title={item.original_title}
          rating={item.vote_average}
          date={item.release_date}
          id={item.id}
          movie={item}
          addToList={addToList}
        />
      ))}
    </div>
  </div>
);

const Movie = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcomingResponse = axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
        );
        const topRatedResponse = axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
        );
        const nowPlayingResponse = axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
        );
        const popularResponse = axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=2`
        );

        const [
          upcoming,
          topRated,
          nowPlaying,
          popular,
        ] = await Promise.all([
          upcomingResponse,
          topRatedResponse,
          nowPlayingResponse,
          popularResponse,
        ]);

        // Simulate loading for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUpcomingMovies(upcoming.data.results);
        setTopRatedMovies(topRated.data.results);
        setNowPlayingMovies(nowPlaying.data.results);
        setPopularMovies(popular.data.results);

        setLoading(false); // Set loading to false when all data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true); // Set error to true on error
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  const addToList = (movie) => {
    const storedList = JSON.parse(localStorage.getItem("myList")) || [];
    const updatedList = [...storedList, movie];
    localStorage.setItem("myList", JSON.stringify(updatedList));
    toast(`"${movie.original_title}" has been added to your list`);
  };

  if (loading) return <LoadingPage />; // Show loading indicator while fetching data

  if (error) return <ErrorPage />; // Show error page if there's an error

  return (
    <section className="movie pt-32">
      <Row
        title={"Upcoming Movies"}
        description={"Check out the latest movies that will be coming to theaters soon."}
        arr={upcomingMovies}
        addToList={addToList}
      />
      <Row
        title={"Top Rated Movies"}
        description={"Here are some of the highest rated movies according to our users."}
        arr={topRatedMovies}
        addToList={addToList}
      />
      <Row
        title={"Now Playing"}
        description={"Currently playing in theaters, don't miss these movies."}
        arr={nowPlayingMovies}
        addToList={addToList}
      />
      <Row
        title={"Popular Movies"}
        description={"These are the most popular movies right now."}
        arr={popularMovies}
        addToList={addToList}
      />
      <ToastContainer />
    </section>
  );
};

export default Movie;
