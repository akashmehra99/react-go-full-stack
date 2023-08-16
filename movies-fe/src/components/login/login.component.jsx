import React, { useState } from 'react';
import { Input } from '../form/input.component';
import { useNavigate, useOutletContext } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setJwtToken, setAlertClassName, setAlertMessage } =
        useOutletContext();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // build the request payload
        let payload = {
            email: email,
            password: password,
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        };
        fetch(`/authenticate`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setAlertClassName('alert-danger');
                    setAlertMessage(data.message);
                } else {
                    setJwtToken(data.access_token);
                    setAlertClassName('d-none');
                    setAlertMessage('');
                    navigate('/');
                }
            })
            .catch((error) => {
                setAlertClassName('alert-danger');
                setAlertMessage('Something went wrong!!!');
            });
    };
    return (
        <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <Input
                    title="Email Address"
                    type="email"
                    className="form-control"
                    name="email"
                    autocomplete="email-new"
                    onChange={(event) => setEmail(event.target.value.trim())}
                    placeholder="Enter Email"
                />
                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autocomplete="password-new"
                    placeholder="Enter Password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input
                    type="submit"
                    className="btn btn-primary"
                    disabled={!email || !password}
                    value={'Login'}
                />
            </form>
        </div>
    );
};
