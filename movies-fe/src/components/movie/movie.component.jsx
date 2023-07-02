import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Movie = () => {
    const [movie, setMovie] = useState({});
    const { id } = useParams();

    useEffect(() => {
        let myMovie = {
            id: 1,
            title: 'Highlander',
            releaseDate: '1986-03-07',
            runtime: 116,
            mpaa_rating: 'R',
            description: 'Some long description',
        };
        setMovie(myMovie);
    }, [id]);
    return (
        <div>
            <h2>Movie: {movie.title}</h2>
            <small>
                <em>
                    {movie.releaseDate}, {movie.runtime} minutes, Rated{' '}
                    {movie.mpaa_rating}
                </em>
            </small>
            <hr />
            <p>{movie.description}</p>
        </div>
    );
};
