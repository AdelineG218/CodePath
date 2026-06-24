import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import { getAllEvents } from '../services/EventsAPI'
import '../css/Events.css'

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

            <div className='events-container'>
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
                        <h3>No events found.</h3>
                    )
                }
            </div>
        </div>
    )
}

export default Events