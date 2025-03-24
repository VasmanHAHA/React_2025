import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { MantinePage } from './pages/Mantine.page';
import { ReduxPage } from './pages/Redux.page';
import { HomePage } from './pages/Home.page';
import { routNames } from './config/routes';


const routes: RouteObject[] = [
  {
    path: routNames.home,
    element: <HomePage />,
  },
  {
    path: routNames.redux,
    element: <ReduxPage />,
  },
  {
    path: routNames.mantine,
    element: <MantinePage />,
  },
  {
    path: '*',
    element: <MantinePage />,
  },
];

const router = createBrowserRouter(routes);

export function Router() {
  return <RouterProvider router={router} />;
}
