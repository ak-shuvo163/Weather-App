import { useState } from "react";
import weatherBanner from "../assets/weatherBanner.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { Cloud, Search } from "lucide-react";
import WeatherCard from "./WeatherCard";
import { clearWeatherData, fetchWeather } from "../redux/features/weatherSlice";

const Weather = () => {
  const { weatherData, loading, error } = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  // local state for animation
  const [fadeOut, setFadeOut] = useState(false);


  console.log(weatherData);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchWeather(city));
    setCity("");
  };
  const handleClear = () => {
    setFadeOut(true); // start fade out animation
    setTimeout(() =>{
      dispatch(clearWeatherData()); // remove from redux
      setFadeOut(false); // remove for next add
    }, 500); // transition duration
  }
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <img
        src={weatherBanner}
        alt="Weather Banner"
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-blue-800/30 to-blue-900/70"></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 w-full max-w-3xl">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Cloud className="w-10 h-10 text-blue-200 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-xl">
            Weather Dashboard
          </h1>
        </div>
        <p className="bg-white/20 backdrop-blur-md px-4 py-2 inline-block rounded-full text-sm md:text-base shadow-lg mb-8">
          Fetch live weather data using Redux Toolkit + Thunk
        </p>


        {/* Error Message */}
        {error && (
          <div className="text-center bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4">
            ❌ {error}
          </div>
        )}

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/30"
        >
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="🔍 Enter city name..."
            className="flex-grow px-4 py-3 rounded-xl border border-white/40 bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
          <button
          onClick={handleClear}
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition-all duration-300"
          >
            Clear
          </button>
        </form>

        {/* Loading/Error Message */}
        <div className="mt-6">
          {loading && (
            <p className="text-blue-200 animate-pulse">Loading weather...</p>
          )}
          {error && <p className="text-red-300 font-medium">{error}</p>}
        </div>
      </div>

      {/* Weather Data  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4 md:px-8">
        {weatherData.map((data, index) => (
          <div key={index} className={`transition-all duration-500 ease-out ${fadeOut ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
            <WeatherCard
            city={data.name}
            temp={data.main.temp}
            description={data.weather[0].description}
            humidity={data.main.humidity}
            wind={data.wind.speed}
            icon={data.weather[0].icon}
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
