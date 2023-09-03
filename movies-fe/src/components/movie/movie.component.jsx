import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export const Movie = () => {
    const [movie, setMovie] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'GET',
            headers: headers,
        };
        fetch(`/movies/${id}`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    if (movie.genres) {
        movie.genres = Object.values(movie.genres);
    } else {
        movie.genres = [];
    }

    return (
        <div>
            <h2>Movie: {movie.title}</h2>
            <small>
                <em>
                    {new Date(movie.release_date).toLocaleDateString('en-us')},{' '}
                    {movie.runtime} minutes, Rated {movie.mpaa_rating}
                </em>
            </small>
            <br />
            {movie.genres.map((g) => (
                <Badge className="me-2" key={g.genre} bg="secondary">
                    {g.genre}
                </Badge>
            ))}
            <hr />
            {movie.Image !== '' && (
                <div className="mb-3">
                    <img
                        src={`https://image.tmdb.org/t/p/w200/${movie.image}`}
                        alt={movie.title}
                    ></img>
                </div>
            )}
            <p>{movie.description}</p>
        </div>
    );
};
