import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Lobby from './screens/Lobby/Lobby';
import Room from './screens/Room/Room';

function AppRouting() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Lobby/>
        },
        {
            path: "/:roomId",
            element: <Room/>
        }
    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default AppRouting
