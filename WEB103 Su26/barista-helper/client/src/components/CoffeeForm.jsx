import React from 'react'
import '../App.css'
import '../css/CoffeeForm.css'

const CoffeeForm = () => {
    const navigate = useNavigate();

    const [type, setType] = useState("Latte");
    const [size, setSize] = useState("Medium");
    const [milk, setMilk] = useState("Whole");
    const [error, setError] = useState("");

    const calculatePrice = () => {
    let price = 3.50;

    switch (type) {
        case "Latte":
        price += 1.00;
        break;
        case "Cappuccino":
        price += 0;
        break;
        case "Americano":
        price += 0.50;
        break;
        case "Mocha":
        price += 1.50;
        break;
    }

    switch (size) {
        case "Medium":
        price += 0.50;
        break;
        case "Large":
        price += 1.00;
        break;
    }

    if (milk === "Oat" || milk === "Almond") {
        price += 0.75;
    }

    return price.toFixed(2);
    };

    const getImage = () => {
    switch (size) {
        case "Small":
        return smallCoffee;
        case "Medium":
        return mediumCoffee;
        case "Large":
        return largeCoffee;
        default:
        return mediumCoffee;
    }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (type === "Cappuccino" && size !== "Small") {
        setError("Cappuccinos are only available in the small size.");
        return;
    }

    if (type === "Americano" && milk !== "None") {
        setError("Americanos cannot contain milk.");
        return;
    }

    await createCoffee({
        type,
        size,
        milk,
        price: calculatePrice()
    });

    navigate("/");
    };

    return (
    <div className="create-coffee">

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
}

export default CoffeeForm