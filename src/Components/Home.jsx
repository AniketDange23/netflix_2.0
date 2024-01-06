import "./home.scss";

import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Api urls
const imgUrl = "https://image.tmdb.org/t/p/original";
// const apikey = "322fb03e52f15b9f7c9ac373ffe0142d";
// const url =
//   "//api.themoviedb.org/3/movie/550?api_key=322fb03e52f15b9f7c9ac373ffe0142d";
// const upcoming = "upcoming";

const Card = ({ img }) => (
  <img src={img} className="card" alt="card-img" width="200px" />
);
const Row = ({
  title,
  arr = [
    {
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fimg&psig=AOvVaw3NbUaoDiTZf5tm8xZq-6gl&ust=1697111944715000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNC_5eT47YEDFQAAAAAdAAAAABAE",
    },
  ],
}) => (
  <div className="row">
    <h2>{title}</h2>
    <div className="card-box">
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);
const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [NowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    //   url for Upcoming
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=322fb03e52f15b9f7c9ac373ffe0142d&page=2 "
      );
      setUpcomingMovies(results);
    };
    //   url for top
    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(
        "https://api.themoviedb.org/3/movie//top_rated?api_key=322fb03e52f15b9f7c9ac373ffe0142d"
      );
      setTopRatedMovies(results);
    };
    //   url for Now playing
    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=322fb03e52f15b9f7c9ac373ffe0142d"
      );
      setNowPlayingMovies(results);
    };
    //   url for popular
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=322fb03e52f15b9f7c9ac373ffe0142d"
      );
      setPopularMovies(results);
    };
    //   get all genre
    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=322fb03e52f15b9f7c9ac373ffe0142d"
      );
      setGenres(genres);
      console.log(genres);
    };
    getAllGenre();
    fetchUpcoming();
    fetchNowPlaying();
    fetchTopRated();
    fetchPopular();
  }, []);
  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${imgUrl}/${popularMovies[0].poster_path})`
            : " rgb(14, 13, 13) ",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div className="btn">
          <button>
            <BsPlayFill /> Play
          </button>
          <button>
            <AiOutlinePlus /> My List
          </button>
        </div>
      </div>
      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Top Rated Movies"} arr={topRatedMovies} />
      <Row title={"My List "} arr={NowPlayingMovies} />
      <Row title={"Tv Shows"} arr={popularMovies} />
      <div className="genre-box">
        {genres.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};
export default Home;
