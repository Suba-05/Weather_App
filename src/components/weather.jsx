import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  
  //const [city, setCity] = useState('');
  const [Inputcity, setInputCity] = useState('');
  const [Searchcity, setSearchCity] = useState("");
  const [Error, setError] = useState("");
  const apiKey = 'b9c4671b519e7f60fa7a7f899897eca2';

  useEffect(() => {
    if (!Searchcity) return;
    setError("");
    setWeather(null);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Searchcity}&appid=b9c4671b519e7f60fa7a7f899897eca2&units=metric`)
      .then(response => response.json())
      .then(data => setWeather(data))
      .catch(() => {
        setError("City not found... Please Enter a Valid City...")
      });
  }, [ Searchcity ]);

  return (
    <div className='min-h-screen bg-cover bg-center bg-[url("/images/sky.jpg")] w-full h-full flex justify-center'>
    <div className='bg-transparent text-blue-900  h-96 w-96 m-20 flex justify-center border-sky-400 rounded lg:text-5xl'>
      <div className='text-center mt-24 '>
      <h1 className='text-blue-900 text-3xl font-bold mt-6 lg:text-6xl'>Weather App</h1>
      <input
        type="text"
        value={Inputcity}
        className='px-6 p-2 border rounded-full bg-sky-100 mt-5 lg:text-4xl'
        onChange={(e) => setInputCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter"){
            setSearchCity(Inputcity);
          }
        }}
        placeholder="Enter city"
      />
      {Error && (
        <p className='text-red-600 font-semibold mt-4'>{Error}</p>
      )}
      {weather && weather.main && weather.weather && (
        <div className='mt-6'>
          <h2 className='font-bold'>{weather.name}</h2>
          <p className='font-bold'>Temperature: {weather.main.temp}°C</p>
          <p className='font-bold'>Weather: {weather.weather[0].description}</p>
        </div>
      )}
      </div>
    </div>
    </div>
  );
};

export default WeatherApp;