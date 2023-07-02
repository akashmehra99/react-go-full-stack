import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "./components/nav/Nav.component";
import { Link, Outlet } from "react-router-dom";
import { Button } from "react-bootstrap";

const App = () => {
  return (
    <div className="conatiner m-3">
      <div className="row">
        <div className="col">
          <h1>Go Watch a Movie!</h1>
        </div>
        <div className="col text-end">
        <Link to={"/login"}><Button variant="success">Login</Button></Link>
        </div>
        <hr className="mb-3"></hr>
      </div>
      <div className="row">
        <div className="col-md-2">
          <Nav />
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
