const getAllLocations = async () => {
  const response = await fetch("http://localhost:3000/locations");
  return response.json();
};

export default getAllLocations