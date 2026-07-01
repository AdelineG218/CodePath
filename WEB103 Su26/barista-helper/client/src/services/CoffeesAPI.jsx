const BASE_URL = "http://localhost:3000/api";

export const getCoffees = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const getCoffeeById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
};

export const createCoffee = async (coffee) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coffee),
  });

  return response.json();
};

export const updateCoffee = async (id, coffee) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coffee),
  });

  return response.json();
};

export const deleteCoffee = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return response.json();
};