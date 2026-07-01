import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCoffeeById, updateCoffee } from "../services/CoffeesAPI";
import "../css/CoffeeForm.css" 

const EditCoffee = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [size, setSize] = useState("");
    const [milk, setMilk] = useState("");

    useEffect(() => {

        const loadCoffee = async () => {

            const coffee = await getCoffeeById(id);

            setType(coffee.type);
            setSize(coffee.size);
            setMilk(coffee.milk);

        };

        loadCoffee();

    }, [id]);

    const calculatePrice = () => {

        let price = 3.50;

        switch (type) {

            case "Latte":
                price += 1.5;
                break;

            case "Flat White":
                price += 1.75;
                break;

            case "Americano":
                price += .75;
                break;

            case "Mocha":
                price += 2;
                break;
        }

        switch (size) {

            case "Medium":
                price += .5;
                break;

            case "Large":
                price += 1;
                break;
        }

        if (
            milk === "Oat" ||
            milk === "Almond"
        ) {
            price += .75;
        }

        return price.toFixed(2);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            type === "Cappuccino" &&
            size !== "Small"
        ) {
            alert("Cappuccinos are only available in the Small size.");
            return;
        }

        if (
            type === "Americano" &&
            milk !== "None"
        ) {
            alert("Americanos cannot contain milk.");
            return;
        }

        await updateCoffee(id, {
            type,
            size,
            milk,
            price: calculatePrice()
        });

        navigate("/");

    };

    return (
        <div className="coffee-form">

            <h1>Create a Coffee</h1>

            <form onSubmit={handleSubmit}>

                <label>Coffee Type</label>
                <select
                value={type}
                onChange={(e) => 
                    {const selectedType = e.target.value;
                    setType(selectedType)

                    if (selectedType === "Americano") {
                        setMilk("None");
                    } else if (selectedType === "Cappuccino") {
                        setSize("Small");
                    }
                }}
                >
                <option>Latte</option>
                <option>Americano</option>
                <option>Cappuccino</option>
                <option>Mocha</option>
                </select>

                <label>Size</label>
                <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                </select>

                <label>Milk</label>
                <select
                value={milk}
                onChange={(e) => setMilk(e.target.value)}
                >
                <option>Whole</option>
                <option>2%</option>
                <option>Oat</option>
                <option>Almond</option>
                <option>None</option>
                </select>

                <img
                src={getImage()}
                alt={type}
                className="coffee-image"
                />

                <h2>${calculatePrice()}</h2>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <button type="submit">
                Save Coffee
                </button>

            </form>

        </div>
    );
};

export default EditCoffee;