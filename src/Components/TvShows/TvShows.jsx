import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingPage from './../LoadingPage';
import ErrorPage from './../ErrorPage';

const imgUrl = "https://image.tmdb.org/t/p/original";
const apiKey = "322fb03e52f15b9f7c9ac373ffe0142d"; // Replace with your actual TMDb API key

const Card = ({ img, title, date, rating, id, show, addToList }) => (
  <div className="relative rounded-lg p-3 m-2 flex-shrink-0 hover:scale-105 hover:bg-slate-950 hover:rounded-lg shadow-lg">
    <img src={img} alt="card-img" className="rounded-lg mb-3 " style={{maxWidth:"220px"}} />
    <h1 className="text-xl font-bold text-white">{title}</h1>
    <p className="text-gray-200">{date}</p>
    <span className="text-black text-sm absolute top-4 p-1 right-5 rounded-md bg-yellow-500">Rating: {rating}</span>
    
    <div className="flex justify-between">
      <Link to={`/tv-show/${id}`} className="text-yellow-400 mt-2 block">
        More Details
      </Link>
      <button
        onClick={() => addToList(show)}
        className="bg-yellow-500 text-black font-bold rounded p-2 w-auto"
      >
        +
      </button>
    </div>
  </div>
);

const Row = ({ title, description, arr, addToList }) => (
  <div className="mb-5">
    <h1 className="text-4xl text-white mb-3">{title}</h1>
    <p className="text-gray-400 mb-5">{description}</p>
    <div className="flex overflow-x-scroll scrollbar-hide">
      {arr.map((item) => (
        <Card
          key={item.id}
          img={`${imgUrl}${item.poster_path}`}
          title={item.name || item.original_name}
          rating={item.vote_average}
          date={item.first_air_date || item.release_date}
          id={item.id}
          show={item}
          addToList={addToList}
        />
      ))}
    </div>
  </div>
);

const TvShows = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [onTheAirShows, setOnTheAirShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcomingResponse = axios.get(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&page=2`
        );
        const popularResponse = axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=2`
        );
        const topRatedResponse = axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=1`
        );
        const onTheAirResponse = axios.get(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&page=1`
        );

        const [
          upcoming,
          popular,
          topRated,
          onTheAir,
        ] = await Promise.all([
          upcomingResponse,
          popularResponse,
          topRatedResponse,
          onTheAirResponse,
        ]);

        // Simulate loading for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setUpcomingShows(upcoming.data.results);
        setPopularShows(popular.data.results);
        setTopRatedShows(topRated.data.results);
        setOnTheAirShows(onTheAir.data.results);

        setLoading(false); // Set loading to false when all data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true); // Set error to true on error
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  const addToList = (show) => {
    const storedList = JSON.parse(localStorage.getItem("myList")) || [];
    const updatedList = [...storedList, show];
    localStorage.setItem("myList", JSON.stringify(updatedList));
    toast(`${show.name || show.original_name} has been added to your list`);
  };

  if (loading) return <LoadingPage />; // Show loading indicator while fetching data

  if (error) return <ErrorPage />; // Show error page if there's an error

  return (
    <section className="tv-shows p-5 pt-24">
      <Row
        title={"Upcoming Shows"}
        description={"Check out the latest TV shows coming soon."}
        arr={upcomingShows}
        addToList={addToList}
      />
      <Row
        title={"Popular Shows"}
        description={"Explore the most popular TV shows right now."}
        arr={popularShows}
        addToList={addToList}
      />
      <Row
        title={"Top Rated Shows"}
        description={"Here are the highest rated TV shows according to our users."}
        arr={topRatedShows}
        addToList={addToList}
      />
      <Row
        title={"On The Air Shows"}
        description={"Currently airing TV shows you shouldn't miss."}
        arr={onTheAirShows}
        addToList={addToList}
      />
      <ToastContainer/>
    </section>
  );
};

export default TvShows;
