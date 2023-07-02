import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from './components/nav/Nav.component';
import { Link, Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { Alert } from './components/alert/alert.component';

const App = () => {
    const [jwtToken, setJwtToken] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertClassName, setAlertClassName] = useState('d-none');

    const logout = () => {
        setJwtToken('');
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
