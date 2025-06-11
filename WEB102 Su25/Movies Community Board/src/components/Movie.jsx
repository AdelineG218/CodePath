const Movie = (props) => {
    return (
        <div className={"MovieCard " + props.genre}>
            <div className="MovieTop"></div>
            <div className="MovieBody">
                <h4>{props.name}</h4>
                <p>{props.popularity}%   |  {props.rating}   |  {props.genre}</p>
                <p>{props.releaseDate}</p>
            </div>
            <div className="MovieBottom"></div>
        </div>
    )
}

export default Movie;