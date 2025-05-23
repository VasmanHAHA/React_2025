import { createBrowserRouter, redirect, RouteObject, RouterProvider } from 'react-router-dom';
import { MantinePage } from './pages/mantine/Mantine.page';
import { ReduxPage } from './pages/redux/Redux.page';
import { HomePage } from './pages/home/Home.page';
import { reduxRoutNames, routNames } from './config/routes';
import { TestsPage } from './pages/tests/TestsPage.page';
import { CountersContainer } from './pages/redux/components/counters-container';
import { UserList } from './pages/redux/components/user-list';
import { UserPage } from './pages/redux/components/user-page';
import { store } from './shared/store/store';
import { fetchUsers } from './shared/store/thunk/fetch-users';
import { usersApi } from './pages/redux/users-api';


const reduxRoutes: RouteObject[] = [
  {
    index: true,
    loader: () => redirect(reduxRoutNames.users)
  },
  {
    path: reduxRoutNames.counters,
    element: <CountersContainer />,
  },
  {
    path: reduxRoutNames.users + '/:userId',
    element: <UserPage />,
    loader: async ({params}) => {
      store.dispatch(usersApi.util.prefetch("getUser", params.userId ?? "", {}))
      return null;
    }
  },
  {
    path: reduxRoutNames.users,
    element: <UserList />,
    loader: async () => {
      // доступ к данным
      // const res = await store.dispatch(usersApi.endpoints.getUsers.initiate()).unwrap(); 
      // User[]
      // store.dispatch(fetchUsers({}));  //использование без rtq
      // запрос данных до рендеринга компонента
      store.dispatch(usersApi.util.prefetch("getUsers", undefined, {}))
      return null;
    }
  },
]

const routes: RouteObject[] = [
  {
    path: routNames.home,
    element: <HomePage />,
  },
  {
    path: routNames.redux,
    element: <ReduxPage />,
    children: reduxRoutes,
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

export const router = createBrowserRouter(routes);
export function getRouter() {
  return router;
}