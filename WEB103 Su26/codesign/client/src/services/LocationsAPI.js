const BASE_URL = 'http://localhost:3000/api/locations'

export const getAllLocations = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const getLocationById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`)
  return response.json()
}