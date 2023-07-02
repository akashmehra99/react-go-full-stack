import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Movies } from '../components/movies/movies.component';
import { Error } from '../components/error/error.component';
import { Home } from '../components/home/home.component';
import { Genres } from '../components/genres/genres.component';
import { Login } from '../components/login/login.component';
import { EditMovie } from '../components/edit-movie/edit-movie.component';
import { ManageCatalogue } from '../components/manage-catalogue/manage-catalogue.component';
import { GraphQL } from '../components/graphql/graphql.component';
import { Movie } from '../components/movie/movie.component';

export const navRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            {
                path: '/movies',
                element: <Movies />,
            },
            {
                path: '/movies/:id',
                element: <Movie />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/genres',
                element: <Genres />,
            },
            {
                path: '/admin/movie/0',
                element: <EditMovie />,
            },
            {
                path: '/manage-catalogue',
                element: <ManageCatalogue />,
            },
            {
                path: '/graphql',
                element: <GraphQL />,
            },
        ],
    },
]);
