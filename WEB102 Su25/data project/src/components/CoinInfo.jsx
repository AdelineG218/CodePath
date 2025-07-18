import { useEffect, useState } from "react"

const CoinInfo = ({image, name, symbol}) => {
    const [price, setPrice] = useState(null);
    const ACCESS_KEY = import.meta.env.VITE_APP_API_KEY;

    useEffect(() => {
        const getCoinPrice = async () => {
            try {
                const response = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`
                );

                const json = await response.json();
                setPrice(json);
            } catch (error) {
                console.error("Failed to fetch coin price:", error);
            }
        };
        getCoinPrice();
    }, [symbol, ACCESS_KEY]);

    return (
        <div>
            <li className="main-list" key={symbol}>
                <img className="icons" src={`https://www.cryptocompare.com${image}`} alt={`Small icon for ${name} crypto coin`}/>
                {name} <span className="tab"></span>
                {price && price.USD ? ` $${price.USD} USD` : null}
            </li>
        </div>
    );
};

export default CoinInfo;