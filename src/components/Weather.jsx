import React, { useEffect, useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = "3707f6c25dcd5c1e643fc14a09aee880";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setWeather(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className="text-center ">Fergana 31.05 °C</p>;
  }

  if (error) {
    return <p className="text-center ">Fergana 31.05 °C</p>;
  }

  return (
    <div className="flex gap-1">
      <div className=" font-semibold">
        {weather && weather.name}
      </div>
      <p className=" text-gray-500">
        {weather && weather.main && weather.main.temp}°C
      </p>
    </div>
  );
};

export default Weather;
