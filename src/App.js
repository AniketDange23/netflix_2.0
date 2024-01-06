import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/header/Header";
import { TvShows } from "./Components/TvShows/TvShows";
import { Movie } from "./Components/Movies/Movie";
import { RecentlyWatch } from "./Components/RecentlyWatch/RecentlyWatch";
import { MyList } from "./Components/MyList/MyList";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/recent_watch" element={<RecentlyWatch />} />
        <Route path="/my_list" element={<MyList />} />


      </Routes>
    </Router>
  );
}

export default App;
