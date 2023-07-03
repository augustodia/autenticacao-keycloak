import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {Admin} from './Admin.tsx';
import {Login} from './Login.tsx';
import {Logout} from './Logout.tsx';
import {Callback} from './Callback.tsx';
import {AuthProvider} from "./AuthProvider.tsx";
import {PrivateRoute} from "./PrivateRoute.tsx";

const router = createBrowserRouter([
    {
        path: 'login',
        element: <Login/>
    },
    {
        path: 'logout',
        element: <Logout/>
    },
    {
        path: 'admin',
        element: (
            <PrivateRoute>
                <Admin/>
            </PrivateRoute>
        )
    },
    {
        path: 'callback',
        element: <Callback/>
    },
    {
        path: '/',
        element: <Login/>
    }
])

function App() {
  return (
      <AuthProvider>
            <RouterProvider router={router}/>
      </AuthProvider>
  )
}

export default App
