import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Input } from '../form/input.component';
import { Select } from '../form/select.component';
import { TextArea } from '../form/textarea.component';
import { Checkbox } from '../form/checkbox.component';

export const EditMovie = () => {
    const navigate = useNavigate();
    const { jwtToken } = useOutletContext();

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const mpaaOptions = [
        { id: 'G', value: 'G' },
        { id: 'PG', value: 'PG' },
        { id: 'PG13', value: 'PG13' },
        { id: 'R', value: 'R' },
        { id: 'NC17', value: 'NC17' },
        { id: '18A', value: '18A' },
    ];
    const addMovieDefaults = useMemo(
        () => ({
            id: 0,
            title: '',
            release_date: '',
            runtime: '',
            mpaa_rating: '',
            description: '',
            genres: [],
            genres_array: [Array(13).fill(false)],
        }),
        []
    );
    const [movie, setMovie] = useState({ ...addMovieDefaults });

    let { id } = useParams();
    if (id === undefined) {
        id = 0;
    }

    useEffect(() => {
        if (jwtToken === '') {
            navigate('/login');
            return;
        }
        if (id === 0) {
            // adding a movie
            setMovie({ ...addMovieDefaults });
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const requestOptions = {
                method: 'GET',
                headers: headers,
            };
            fetch('/genres', requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    const checks = [];
                    data.forEach((g) => {
                        checks.push({
                            id: g.id,
                            checked: false,
                            genre: g.genre,
                        });
                    });
                    setMovie((m) => ({
                        ...m,
                        genres: checks,
                        genres_array: [],
                    }));
                })
                .catch((err) => console.error(err));
        } else {
            // edit a movie
        }
    }, [id, addMovieDefaults, jwtToken, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = [];
        let required = [
            { field: movie.title, name: 'title' },
            { field: movie.release_date, name: 'release_date' },
            { field: movie.runtime, name: 'runtime' },
            { field: movie.description, name: 'description' },
            { field: movie.mpaa_rating, name: 'mpaa_rating' },
        ];

        required.forEach((obj) => {
            if (obj.field === '') {
                errors.push(obj.name);
            }
        });

        if (!movie.genres_array.length) {
            errors.push('genres');
        }

        setErrors(errors);
        if (errors.length) {
            return false;
        }
    };

    const handleChange = () => (event) => {
        let value = event.target.value.trim();
        let name = event.target.name;
        setMovie({
            ...movie,
            [name]: value,
        });
    };

    const handleCheck = (event, position) => {
        console.log(
            'Handle Check called -> ',
            event.target.value,
            position,
            event.target.checked
        );
        let tempArr = movie.genres;
        tempArr[position].checked = !tempArr[position].checked;

        let tempIDs = movie.genres_array;
        if (!event.target.checked) {
            tempIDs.splice(tempIDs.indexOf(event.target.value), 1);
        } else {
            tempIDs.push(parseInt(event.target.value, 10));
        }

        setMovie({ ...movie, genres_array: tempIDs });
    };

    const hasError = (key) => {
        return errors.indexOf(key) !== -1;
    };

    return (
        <div>
            <h2>{id === 0 ? 'Add' : 'Edit'} Movie</h2>
            <hr />
            {/* <pre>{JSON.stringify(movie, null, 3)}</pre> */}
            <Form noValidate onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={movie.id} id="id" />

                <Input
                    title={'Title'}
                    className="form-control"
                    type={'text'}
                    name={'title'}
                    value={movie.title}
                    onChange={handleChange('title')}
                    errorDiv={hasError('title') ? 'text-danger' : 'd-none'}
                    errorMsg={'Please enter a title'}
                />
                <Input
                    title={'Release Date'}
                    className="form-control"
                    type={'date'}
                    name={'release_date'}
                    value={movie.release_date}
                    onChange={handleChange('release_date')}
                    errorDiv={
                        hasError('release_date') ? 'text-danger' : 'd-none'
                    }
                    errorMsg={'Please enter a release date'}
                />
                <Input
                    title={'Runtime'}
                    className="form-control"
                    type={'text'}
                    name={'runtime'}
                    value={movie.runtime}
                    onChange={handleChange('runtime')}
                    errorDiv={hasError('runtime') ? 'text-danger' : 'd-none'}
                    errorMsg={'Please enter a runtime'}
                />
                <Select
                    title={'MPAA Rating'}
                    name={'mpaa_rating'}
                    options={mpaaOptions}
                    onChange={handleChange('mpaa_rating')}
                    placeholder={'Choose...'}
                    errorMsg="Please Choose"
                />
                <TextArea
                    title={'Description'}
                    name={'description'}
                    value={movie.description}
                    rows={3}
                    onChange={handleChange('description')}
                    errorDiv={
                        hasError('description') ? 'text-danger' : 'd-none'
                    }
                    errorMsg={'Please enter a description'}
                />
                <hr />
                <h3>Genres</h3>
                <div className={hasError('genres') ? 'text-danger' : 'd-none'}>
                    Select atlease one genre
                </div>
                {movie.genres && movie.genres.length > 1 && (
                    <>
                        {Array.from(movie.genres).map((g, index) => (
                            <>
                                <Checkbox
                                    name={g.genre}
                                    key={index}
                                    id={`genre-${index}`}
                                    onChange={(event) =>
                                        handleCheck(event, index)
                                    }
                                    value={g.id}
                                    checked={movie.genres[index].checked}
                                />
                            </>
                        ))}
                    </>
                )}
                <hr />
                <input
                    type="submit"
                    className="btn btn-primary"
                    value={'Save'}
                />
            </Form>
        </div>
    );
};
