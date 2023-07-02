import React from "react";
import Ticket from '../../images/movie_tickets.jpg';
import { Link } from "react-router-dom";
export const Home = () => {
    return (
        <>
            <div className="text-center">
                <h2>Find a movie to watch tonight!</h2>
                <hr />
                <Link to={"/movies"}>
                    <img src={Ticket} alt="Movie Tickets" />

                </Link>
            </div>
        </>
    )
};