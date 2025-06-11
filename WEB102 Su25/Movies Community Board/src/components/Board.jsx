import Movie from './Movie';

const Board = () => {
    const movies = [
        {
            "name": "Lilo & Stitch",
            "date": "May 23, 2025",
            "rating": "PG",
            "genre": "Family",
            "popularity": 93,
        },
        {
            "name": "Sinners",
            "date": "April 18, 2025",
            "rating": "R",
            "genre": "Horror",
            "popularity": 97,
        },
        {
            "name": "Neighborhood Watch",
            "date": "April 25, 2025",
            "rating": "R",
            "genre": "Thriller",
            "popularity": 69,
        },
        {
            "name": "Ad Vitam",
            "date": "January 10, 2025",
            "rating": "R",
            "genre": "Thriller",
            "popularity": 43,
        },
        {
            "name": "The Woman in the Yard",
            "date": "March 28, 2025",
            "rating": "PG-13",
            "genre": "Horror",
            "popularity": 47,
        },
        {
            "name": "Cleaner",
            "date": "February 21, 2025",
            "rating": "R",
            "genre": "Action",
            "popularity": 66,
        },
        {
            "name": "The Life List",
            "date": "March 28, 2025",
            "rating": "PG-13",
            "genre": "Romance",
            "popularity": 70,
        },
        {
            "name": "On Becoming a Guinea Fowl",
            "date": "March 7, 2025",
            "rating": "PG-13",
            "genre": "Comedy",
            "popularity": 100,
        },
        {
            "name": "The Ballad of Wallis Island",
            "date": "April 18, 2025",
            "rating": "PG-13",
            "genre": "Comedy",
            "popularity": 98,
        },
        {
            "name": "Predator: Killer of Killers",
            "date": "June 6, 2025",
            "rating": "R",
            "genre": "Sci-Fi",
            "popularity": 95,
        },
        {
            "name": "How to Train Your Dragon",
            "date": "June 13, 2025",
            "rating": "PG",
            "genre": "Family",
            "popularity": 80,
        },
        {
            "name": "Thunderbolts*",
            "release-date": "May 2, 2025",
            "rating": "PG-13",
            "genre": "Action",
            "popularity": 93,
        },
    ];
    const sortedMovies =  movies.slice().sort( (item1, item2) => {
        return item2.popularity - item1.popularity;
    });
    return (

        <div className="Board">
            {sortedMovies.map((m) => (
                <Movie 
                    name={m.name} 
                    rating={m.rating} 
                    popularity={m.popularity} 
                    genre={m.genre}
                    release-date={m.date}
                />
            ))}
        </div>
    )
}

export default Board;