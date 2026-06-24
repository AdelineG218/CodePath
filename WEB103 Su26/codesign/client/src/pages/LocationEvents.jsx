import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import { getLocationById } from '../services/LocationsAPI'
import { getEventsByLocation } from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = ({ index }) => {
    const [location, setLocation] = useState({})
    const [events, setEvents] = useState([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const locationData = await getLocationById(index)
                setLocation(locationData)

                const eventsData = await getEventsByLocation(index)
                setEvents(eventsData)
                console.log(eventsData[0])
            } catch (error) {
                console.error(error)
            }
        }

        loadData()
    }, [index])

    return (
        <div className='location-events'>
            <header>
                {location.image && (
                    <div className='location-image'>
                        <img src={location.image} alt={location.name} />
                    </div>
                )}

                <div className='location-info'>
                    <h2>{location.name}</h2>
                </div>
            </header>

            <main>
                {
                    events.length > 0 ? (
                        events.map(event => (
                            <Event
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                date={event.date}
                                description={event.description}
                            />
                        ))
                    ) : (
                        <h2>
                            No events scheduled at this location yet!
                        </h2>
                    )
                }
            </main>
        </div>
    )
}

export default LocationEvents