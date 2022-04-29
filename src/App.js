import { useState } from "react";
import "./App.css";
import Styled from "styled-components";

const Box = Styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  // box-shadow: 17px 10px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 1px 27px 17px -9px rgba(37,7,7,1);
  -webkit-box-shadow: 1px 27px 17px -9px rgba(37,7,7,1);
  -moz-box-shadow: 1px 27px 17px -9px rgba(37,7,7,1);
  // min-width: 470px;
  max-width: 453;
  @media only screen and (max-width: 449px) {
    height: 500px;
  }

`;

const initial = {
  place: "City",
  temp: `0°C`,
  wind: `0Kmph`,
  humidity: `0g.m-3`
};

const url = `https://static.onecms.io/wp-content/uploads/sites/28/2021/07/30/new-delhi-india-NEWDELHITG0721.jpg`;

 const  App=()=> {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(initial);
  const [backgroundImg, setBackgroundImg] = useState(url);

  const getData = () => {
    if (query.trim().length > 0) {
      getWeatherData();
      getBackgroundImg();
      setQuery("");
    } else {
      setLocation(initial);
      setBackgroundImg(url);
    }
  };

  const getBackgroundImg = () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
        "X-RapidAPI-Key": "5d1ab607edmsh3e58f17a685146ap188a0cjsn18c8b5010665"
      }
    };

    fetch(
      `https://bing-image-search1.p.rapidapi.com/images/search?q=${query}`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setBackgroundImg(
          response.value[~~(Math.random() * response.value.length)].contentUrl
        )
      )
      .catch((err) => console.error(err));
  };

  const getWeatherData = () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        "X-RapidAPI-Key": "5d1ab607edmsh3e58f17a685146ap188a0cjsn18c8b5010665"
      }
    };

    fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`,
      options
    )
      .then((response) => response.json())
      .then((data) =>
        setLocation({
          place: data.location.name,
          temp: `${data.current.temp_c}°c`,
          wind: `${data.current.wind_kph}kph`,
          humidity: `${data.current.humidity}g.m-3`
        })
      )
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <Box>
        <div id="set">
          <div id="image">
          <img src={backgroundImg} alt="background" />
          </div>
          <div id="result">
            <name>Place: {location.place} </name>
            <div>Temp:{location.temp}</div>
            <div>Wind: {location.wind} </div>
            <div>Humidity:{location.humidity}</div>
          </div>
        </div>

        <div id="test">
          <h1>Weather App</h1>
          <div>
            <input
              type="text"
              placeholder={`${initial.place}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => getData()}>Search</button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default App