import { useEffect, useState } from "react";
import CoinInfo from "./components/CoinInfo";
import "./App.css";

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?&api_key=${ACCESS_KEY}`
      );
      let json = await response.json();
      setList(json);
    };
    fetchAllData().catch(console.error);
  }, [ACCESS_KEY]);

  const searchItems = searchValue => {
    setSearchInput(searchValue)
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(Object.keys(list.Data))
    }
  }

  return (
    <div className="whole-page">
      <h1>Crypto Checker</h1>

      <h3>Summary Statistics</h3>
      <div className="Summary">
        <p>Average Health Score</p>
        <p>Average Spoonacular Score</p>
        <p>Average Price Per Serving</p>
      </div>

      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      <ul>
        {searchInput.length > 0 ? filteredResults
          .slice(0,10).map((coin) => {
            const coinData = list.Data[coin]
            if (
              coinData.IsTrading &&
              coinData.Algorithm !== "N/A" &&
              coinData.ProofType !== "N/A"
            ) {
              return (
                <CoinInfo
                  key={coin}
                  image={coinData.ImageUrl}
                  name={coinData.FullName}
                  symbol={coinData.Symbol}
                />
              )
            }
            return null
      }) :
        list &&
          Object.entries(list.Data)
          .filter(([, coinData]) =>
            coinData.IsTrading &&
            coinData.Algorithm !== "N/A" &&
            coinData.ProofType !== "N/A"
          )
          .slice(0, 10).map(([coin, ]) => (
            <CoinInfo
              key={coin}
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
              price={list.Data[coin].Price}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
