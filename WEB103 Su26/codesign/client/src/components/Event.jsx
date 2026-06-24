import '../css/Event.css'

const Event = ({ title, date, description }) => {
    const eventDate = new Date(date)
    const now = new Date()

    const millisecondsRemaining = eventDate - now
    const daysRemaining = Math.ceil(
        millisecondsRemaining / (1000 * 60 * 60 * 24)
    )

    return (
        <article className='event-information'>
            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>

                    <p>
                        <strong>Date:</strong>{' '}
                        {eventDate.toLocaleDateString()}
                    </p>

                    <p>{description}</p>

                    <p
                        className={
                            daysRemaining < 0
                                ? 'event-passed'
                                : 'event-upcoming'
                        }
                    >
                        {daysRemaining < 0
                            ? `Occurred ${Math.abs(daysRemaining)} days ago`
                            : `${daysRemaining} days remaining`}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Event