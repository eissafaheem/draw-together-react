import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Lobby from './screens/lobby/Lobby';
import Room from './screens/room/Room';

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
