import { useState } from 'react'
import APICall from './components/APICall';
import BanList from './components/BanList';
import './App.css'

function App() {
  // const [past, setPast] = useState([]);
  const [banYears, setBanYears] = useState([]);
  const [allowedYears, setAllowedYears] = useState(
    [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  );
  const [banMonths, setBanMonths] = useState([]);
  const [allowedMonths, setAllowedMonths] = useState(
    ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  );
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [apodData, setApodData] = useState(null);

  const makeQuery = async () => {
    let year = allowedYears[Math.floor(Math.random()*allowedYears.length)];
    let month = allowedMonths[Math.floor(Math.random()*allowedMonths.length)];
    let day = Math.floor(Math.random()*31)+1;
    if (month==9 || month==4 || month==6 || month==7) {
      day = Math.floor(Math.random()*30)+1;
    } else if (month==2) {
      day = Math.floor(Math.random()*28)+1;
      if ((year-2000)%4==0) {
        day+=1;
      }
    }
    day = day.toString().padStart(2, '0');

    let query = `https://api.nasa.gov/planetary/apod?api_key=${ACCESS_KEY}&date=${year}-${month}-${day}`;
    let response = await fetch(query);
    let json = await response.json();

    let retries = 5;
    while ((json.url == null || json.media_type !== "image") && retries > 0) {
      year = allowedYears[Math.floor(Math.random()*allowedYears.length)];
      month = allowedMonths[Math.floor(Math.random()*allowedMonths.length)];
      day = Math.floor(Math.random() * 28) + 1;

      day = day.toString().padStart(2, '0');

      query = `https://api.nasa.gov/planetary/apod?api_key=${ACCESS_KEY}&date=${year}-${month}-${day}`;
      response = await fetch(query);
      json = await response.json();
      retries--;
    }
      if (json.url && json.media_type === "image") {
      setApodData(json);
    } else {
      console.error("No valid image found after retries.");
      setApodData(null);
    }
  };

  const handleBanClick = (type, value) => {
    let updated;
    let allowed;
    if (type == "years") {
      if (banYears.includes(value)) {
        updated = banYears.filter((v) => v !== value);
        allowed = [...allowedYears, value];
      } else {
        updated = [...banYears, value];
        allowed = allowedYears.filter((v) => v !== value);
      }
      setBanYears(updated);
      setAllowedYears(allowed);
    } else {
      if (banMonths.includes(value)) {
        updated = banMonths.filter((v) => v !== value);
        allowed = [...allowedMonths, value];
      } else {
        updated = [...banMonths, value];
        allowed = allowedMonths.filter((v) => v !== value);
      }
      setBanMonths(updated);
      setAllowedMonths(allowed);
    }
    console.log(allowedYears + allowedMonths);
    console.log(banYears + banMonths);
  }

  return (
    <>
    <div className="main">
      <div>
        <div className="top">
          <h1>Astronomy Veni Vici</h1>
          <p>Discover things that are out of this world!</p>
        </div>
        {apodData && apodData.url ? (
          <div>
            <div className="date-buttons">
              <button onClick={() => handleBanClick("months", apodData.date.slice(5, 7))}>
                {new Date(apodData.date).toLocaleString('default', { month: 'long' })}
              </button>
              <button onClick={() => handleBanClick("years", apodData.date.slice(0, 4))}>{apodData.date.slice(0, 4)}</button>
            </div>
            <br></br>
            <img className="astronomy-pic" src={apodData.url} alt={apodData.title}/>
            <p className="small">{apodData.copyright ? "Image Copyright: " + apodData.copyright : "Image link: " + apodData.url}</p>
            <br></br>
            <h2>{apodData.title}</h2>
            <p>{apodData.explanation}</p>
          </div>
        ) : allowedMonths.length == 0 || allowedYears == 0 ? (
          <div>
            <p>Remove items from the ban list to generate a new image ➡️</p>
          </div>
        ) : (
          <div>
            <p>Click the button to generate a new image 🌠</p>
          </div>
        )}
        <APICall
          // inputs = {banList}
          onSubmit = {makeQuery}
        />
      </div>
      {banMonths.length+banYears.length > 0 &&
      <div className={`ban${(allowedMonths.length == 0 || allowedYears == 0) ? " disabled" : ""}`}>
        <BanList 
          bannedMonths = {banMonths}
          bannedYears = {banYears}
          onUnban={handleBanClick}
        />
      </div>
      }
    </div>
    {/* {past.length > 0 && <div className="history">
    </div>} */}
    </>
  )
};

export default App;
