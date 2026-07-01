import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoffeeById } from "../services/CoffeesAPI";
import "../App.css";
import "../css/CoffeeDetails.css"

import smallCoffee from "../assets/small.png";
import mediumCoffee from "../assets/medium.png";
import largeCoffee from "../assets/large.png";

const CoffeeDetails = () => {
  const { id } = useParams();

  const [coffee, setCoffee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCoffee = async () => {
      const data = await getCoffeeById(id);
      setCoffee(data);
      setLoading(false);
    };

    loadCoffee();
  }, [id]);

  const getImage = () => {
    if (!coffee) return "";

    switch (coffee.size.toLowerCase()) {
      case "small":
        return smallCoffee;
      case "medium":
        return mediumCoffee;
      case "large":
        return largeCoffee;
      default:
        return mediumCoffee;
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (!coffee || coffee.error)
    return <h2>Coffee not found.</h2>;

  return (
    <div className="coffee-details">

      <h1>{coffee.type}</h1>

      <img
        src={getImage()}
        alt={coffee.type}
        className="coffee-image"
      />

      <div className="coffee-info">

        <p>
          <strong>Size:</strong> {coffee.size}
        </p>

        {coffee.type != 'Americano'} : (<p>
          <strong>Milk:</strong> {coffee.milk}
        </p>) : ()

        <p>
          <strong>Price:</strong> $
          {Number(coffee.price).toFixed(2)}
        </p>

      </div>

    </div>
  );
};

export default CoffeeDetails;