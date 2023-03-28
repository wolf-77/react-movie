import { useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
import API_KEY from "./env";

const API_ULR = `http://www.omdbapi.com/?apikey=${API_KEY}`;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [input, setInput] = useState(false);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_ULR}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchTerm.length > 0 ? searchMovies(searchTerm) : setInput(true)}
                />
            </div>
            {
                movies.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => <MovieCard movie={movie} />)}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
            {
                input && ("")
            }
        </div>
    );
}

export default App;