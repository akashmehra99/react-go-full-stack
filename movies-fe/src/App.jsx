import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from './components/nav/Nav.component';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Alert } from './components/alert/alert.component';

const App = () => {
    const [jwtToken, setJwtToken] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertClassName, setAlertClassName] = useState('d-none');
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtToken === '') {
            const requestOptions = {
                method: 'GET',
                credentials: 'include',
            };
            fetch(`/refresh`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.access_token) {
                        setJwtToken(data.access_token);
                    }
                })
                .catch((error) =>
                    console.error('User is not logged in ', error)
                );
        }
    }, [jwtToken]);

    const logout = () => {
        setJwtToken('');
        navigate('/login');
    };
    return (
        <div className="conatiner m-3">
            <div className="row">
                <div className="col">
                    <h1>Go Watch a Movie!</h1>
                </div>
                <div className="col text-end">
                    {jwtToken ? (
                        <Link to={'/login'}>
                            <Button variant="danger" onClick={logout}>
                                Logout
                            </Button>
                        </Link>
                    ) : (
                        <Link to={'/login'}>
                            <Button variant="success">Login</Button>
                        </Link>
                    )}
                </div>
                <hr className="mb-3"></hr>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <Nav isLoggedIn={jwtToken !== ''} />
                </div>
                <div className="col-md-10">
                    <Alert message={alertMessage} className={alertClassName} />
                    <Outlet
                        context={{
                            jwtToken,
                            setJwtToken,
                            setAlertClassName,
                            setAlertMessage,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
