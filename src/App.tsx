import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { router } from './Router';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { store } from './shared/store/store';
import { fetchUsers } from './shared/store/thunk/fetch-users';
import { RouterProvider } from 'react-router-dom';

// параллельная загрузка данных при загрузке страницы
// store.dispatch(fetchUsers({}))

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  );
}
