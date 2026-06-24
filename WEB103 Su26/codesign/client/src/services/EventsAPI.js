const BASE_URL = 'http://localhost:3000/api/events'

export const getAllEvents = async () => {
  const response = await fetch(BASE_URL)
  return response.json()
}

export const getEventsByLocation = async (locationId) => {
  const response = await fetch(
    `${BASE_URL}/location/${locationId}`
  )

  return response.json()
}