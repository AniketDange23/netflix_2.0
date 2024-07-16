import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
 import Cover from '../../image/cover.jpg'
import Logos from "../../image/logoLoading.png"
const imgUrl = "https://image.tmdb.org/t/p/original";

const MyList = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('myList')) || [];
    setMyList(storedList);
  }, []);

  const removeAllFromList = () => {
    setMyList([]);
    localStorage.removeItem('myList');
    toast.dark('All items removed from My List');
  };

  const removeFromList = (id, item) => {
    if (!item || !item.id) {
      return; // Exit early if item or item.id is null or undefined
    }

    const updatedList = myList.filter((listItem) => listItem.id !== id);
    setMyList(updatedList);
    localStorage.setItem('myList', JSON.stringify(updatedList));
    toast.dark(`${item.original_name || item.original_title} removed from My List`);
  };

  return (
    <section className="my-list  ">
    <div className="cove-bg absolute -z-20 opacity-35">
      <img src={Cover} alt="cover" />
    </div>
      <h2 className="text-2xl text-white mb-5 px-5 text-center pt-28 font-bold">My List</h2>
      {myList.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src={Logos} alt="Netflix Logo" className="h-64 mb-4" />
          <p className="text-white mb-4 text-center font-bold  text-3xl">
            Your list is empty.  
          </p>
          <p className=" text-gray-400 mb-4 text-center  text-xl">Add your favorite movies and TV shows!</p>
          <Link to="/" className="text-blue-500  font-serif text-3xl hover:underline">
            Discover Movies & TV Shows
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 px-5">
          {myList.map((item) => (
            item && item.id ? (
              <Card 
                key={item.id} 
                item={item} 
                removeFromList={removeFromList} 
              />
            ) : null
          ))}
        </div>
      )}
     
      <ToastContainer/>
    </section>
  );
};

const Card = ({ item, removeFromList }) => {
  const [showMore, setShowMore] = useState(false);

  if (!item || !item.id) {
    return null; // Handle cases where item or item.id is null or undefined
  }

  return (
    <div className="relative rounded-lg p-3 flex-shrink-0   backdrop-blur-sm  hover:border">
      <img src={`${imgUrl}${item.poster_path}`} alt="card-img" className="rounded-lg mb-3 max-w-[220px]" />
      <h3 className="text-lg text-white">{item.original_title || item.original_name}</h3>
      <p className="text-gray-400">{item.release_date}</p>
      <p className="text-gray-400">{item.release_date}</p>
      <div className="flex flex-col gap-2   items-start ">
        <p className="text-black text-sm bg-yellow-500 px-2 py-1 rounded-md font-bold">Rating: {item.vote_average}</p>
        <p className="text-black text-sm bg-gray-300 px-2 py-1 rounded-md font-bold">Language: {item.original_language}</p>
        <p className="text-black text-sm bg-gray-300 px-2 py-1 rounded-md font-bold">Popularity: {item.popularity}</p>
      </div>
      <p className="text-white max-w-[220px]">
        {showMore ? item.overview : `${item.overview.substring(0, 50)}...`}
        <button 
          className=" text-gray-400 ml-1" 
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </p>
      <span className="text-black text-sm absolute top-4 p-1.5 right-5 rounded-md bg-yellow-500 font-bold">Rating: {item.vote_average}</span>
      <button onClick={() => removeFromList(item.id, item)} className="mt-3 bg-yellow-500 text-black rounded p-2">
        Remove
      </button>
    </div>
  );
};

export default MyList;
