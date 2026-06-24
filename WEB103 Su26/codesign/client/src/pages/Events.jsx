import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import { getAllEvents } from '../services/EventsAPI'

const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await getAllEvents()
                setEvents(data)
            } catch (error) {
                console.error(error)
            }
        }

        loadEvents()
    }, [])

    return (
        <div className='all-events'>
            <h2>All Events</h2>

            {
                events.length > 0 ? (
                    events.map(event => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.event_date}
                            description={event.description}
                        />
                    ))
                ) : (
                    <h3>No events found.</h3>
                )
            }
        </div>
    )
}

export default Events