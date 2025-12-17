// React import not required with the automatic JSX runtime
import { Cloud, CloudRain, CloudSun, Thermometer, Wind } from "lucide-react";

const WeatherCard = ({ city, temp, description, humidity, wind, icon }) => {
  const getWeatherIcon = (desc) => {
    const d = desc.toLowerCase();
    if (d.includes("rain"))
      return <CloudRain className="w-10 h-10 text-blue-300 animate-pulse" />;
    if (d.includes("sun") || d.includes("clear"))
      return <CloudSun className="w-10 h-10 text-yellow-300 animate-bounce" />;
    if (d.includes("cloud"))
      return <Cloud className="w-10 h-10 text-gray-200 animate-pulse" />;
    if (d.includes("snow"))
      return (
        <Snowflake className="w-10 h-10 text-cyan-200 animate-spin-slow" />
      );

    return <CloudSun className="w-10 h-10 text-orange-200" />; // fallback icon
  };
  return (
    <div
      className="
        relative p-6 rounded-3xl w-full max-w-sm mx-auto
        bg-white/10 backdrop-blur-lg border border-white/20
        shadow-xl hover:shadow-2xl
        hover:scale-105 transition-all duration-300
        overflow-visible
      "
    >
      {/* subtle gradient overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-400/30 via-sky-400/20 to-purple-500/30 opacity-30 hover:opacity-50 transition-opacity duration-500"></div>

      <div className="relative z-10 text-white text-center">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-wide drop-shadow-lg">
            {city}
          </h2>
          {getWeatherIcon(description)}
        </div>

        {/* Temperature */}
        <div className="flex flex-col items-center mb-4">
          <span className="text-5xl font-extrabold drop-shadow-md">
            {Math.round(temp)}°C
          </span>
          <p className="text-lg capitalize opacity-90">{description}</p>
        </div>

        {/* Optional Weather Icon */}
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather-icon"
            className="mx-auto w-20 h-20 md:w-24 md:h-24 drop-shadow-lg mb-2"
          />
        )}

        {/* Weather details */}
        <div className="flex justify-between items-center text-sm mt-3 px-2">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-white/70" />
            <p className="opacity-80">Humidity: {humidity}%</p>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-white/70" />
            <p className="opacity-80">Wind: {wind} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
