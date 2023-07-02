import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Nav = ({ isLoggedIn }) => {
    return (
        <nav>
            <ListGroup as="ul">
                <Link to={'/'}>
                    <ListGroupItem action>Home</ListGroupItem>
                </Link>
                <Link to={'/movies'}>
                    {' '}
                    <ListGroupItem action>Movies</ListGroupItem>
                </Link>
                <Link to={'/genres'}>
                    <ListGroupItem action>Genres</ListGroupItem>
                </Link>
                {isLoggedIn && (
                    <>
                        <Link to={'/admin/movie/0'}>
                            {' '}
                            <ListGroupItem action>Add Movie</ListGroupItem>
                        </Link>
                        <Link to={'/manage-catalogue'}>
                            <ListGroupItem action>
                                ManageCatalogue{' '}
                            </ListGroupItem>
                        </Link>
                        <Link to={'/graphql'}>
                            <ListGroupItem action>GraphQL</ListGroupItem>
                        </Link>
                    </>
                )}
            </ListGroup>
        </nav>
    );
};
