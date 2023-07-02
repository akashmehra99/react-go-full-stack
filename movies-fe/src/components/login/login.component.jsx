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
        if (email === 'admin@example.com') {
            setJwtToken('abc');
            setAlertClassName('d-none');
            setAlertMessage('');
            navigate('/');
        } else {
            setAlertClassName('alert-danger');
            setAlertMessage('Invalid Credentials');
        }
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
                    onChange={(event) => setEmail(event.target.value)}
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
                    value={'Login'}
                />
            </form>
        </div>
    );
};
