import React from 'react';
import { createBrowserRouter,RouterProvider  } from 'react-router-dom';
import TransactionPanel from './components/TransactionPanel';
import Layout from './Layout';
import Home from './pages/Home';

const App = () => {
  const routes = createBrowserRouter([
    {
      path:'',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>,
        },
        {
        path:'/transaction-history',
        element:<TransactionPanel/>,
        }
      ]
    }
  ])
  const fallbackElement = <div>Oops! Something went wrong.</div>; // You can customize this fallback UI
  const future = routes;
  return (
    <div>
      <RouterProvider
        router={routes}
        fallbackElement={fallbackElement}
        future={future}
      />
    </div>
  );
};

export default App;
