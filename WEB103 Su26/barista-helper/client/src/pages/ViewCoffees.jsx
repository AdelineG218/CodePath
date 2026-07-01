import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCoffees, deleteCoffee } from "../services/CoffeesAPI";
import "../css/ViewCoffees.css"

import smallCoffee from "../assets/small.png";
import mediumCoffee from "../assets/medium.png";
import largeCoffee from "../assets/large.png";

const ViewCoffees = () => {
    const [coffees, setCoffees] = useState([]);

    const loadCoffees = async () => {
        const data = await getCoffees();
        setCoffees(data);
    };

    useEffect(() => {
        loadCoffees();
    }, []);

    const handleDelete = async (id) => {
        await deleteCoffee(id);
        loadCoffees();
    };

    const getImage = (coffee) => {
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

    return (
        <div className="coffee-list">

            <h1>Your Coffees</h1>

            {coffees.length === 0 && (
                <p>No coffees have been created yet.</p>
            )}

            {coffees.map((coffee) => (
                <div className="coffee-card" key={coffee.id}>

                    <h2>${Number(coffee.price).toFixed(2)}</h2>

                    <img
                        src={getImage(coffee)}
                        alt={coffee.size}
                        className="coffee-image"
                    />

                    <p>{coffee.size} {coffee.type} {coffee.type != "Americano" ? `with ${coffee.milk} Milk` : ""}</p>

                    <Link to={`/coffee/${coffee.id}`}>
                        Details
                    </Link>

                    <Link to={`/edit/${coffee.id}`}>
                        Edit
                    </Link>

                    <button
                        onClick={() => handleDelete(coffee.id)}
                    >
                        Delete
                    </button>

                </div>
            ))}

        </div>
    );
};

export default ViewCoffees;