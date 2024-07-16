import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPage from "./Components/LoadingPage";
import ErrorPage from "./Components/ErrorPage";
import Header from "./Components/header/Header";
import Home from "./Components/Home";
import TvShows from "./Components/TvShows/TvShows";
import Movie from "./Components/Movies/Movie";
import MyList from "./Components/MyList/MyList";
import TvShowDetails from "./Components/TvShows/TvShowDetails";
import MovieDetails from "./Components/Movies/MovieDetails";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate loading and error state changes
    setTimeout(() => setLoading(false), 2000); // Replace with actual data fetching logic
    // setError(true); // Uncomment to test error state
  }, []);

  if (loading) return <LoadingPage />; // Show loading indicator while loading
  if (error) return <ErrorPage />; // Show error page if there's an error

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/my_list" element={<MyList />} />
        <Route path="/tv-show/:id" element={<TvShowDetails />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
