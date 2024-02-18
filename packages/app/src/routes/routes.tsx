import Home from '@pages/home';
import {HOME_PATH} from './name';
import {RouteObject, createBrowserRouter} from 'react-router-dom';

const routes: RouteObject[] = [{path: HOME_PATH, element: <Home />}];

export default createBrowserRouter(routes);
