import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {Login} from './Login.tsx';
import {Logout} from './Logout.tsx';
import {Callback} from './Callback.tsx';


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
        element: <div>Admin</div>
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
      <RouterProvider router={router}/>
  )
}

export default App
