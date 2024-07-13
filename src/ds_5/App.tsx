import React from 'react';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';

import EmployerPage from './src/pages/EmployerPage';
import DepartmentPage from './src/pages/DepartmentPage';

import { Route, Header } from './src/components';

import './App.scss';

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <div className="App scroller">
          <Route pageName={['1']}>
            <EmployerPage />
          </Route>
          <Route pageName={['2']}>
            <DepartmentPage />
          </Route>
        </div>
      </Provider>
    </>
  );
}

export default App;
