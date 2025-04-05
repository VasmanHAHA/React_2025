import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { MantinePage } from './pages/mantine/Mantine.page';
import { ReduxPage } from './pages/redux/Redux.page';
import { HomePage } from './pages/home/Home.page';
import { routNames } from './config/routes';
import { TestsPage } from './pages/tests/TestsPage.page';


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
    path: routNames.tests,
    element: <TestsPage />,
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
