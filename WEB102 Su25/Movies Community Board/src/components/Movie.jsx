const Movie = (props) => {
    return (
        <div className={"Movie-Card" + props.genre}>
            <h4>{props.name}</h4>
            <div className="Movie-Nums">
                <p>{props.popularity}</p>
                <p>{props.rating}</p>
            </div>
        </div>
    )
}

export default Movie;