import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { store } from './shared/store/store';
import { fetchUsers } from './pages/redux/model/fetch-users';

// параллельная загрузка данных при загрузке страницы
store.dispatch(fetchUsers)

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </MantineProvider>
  );
}
