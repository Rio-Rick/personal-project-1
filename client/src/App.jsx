import { useState } from 'react'
import './App.css'
import {RouterProvider} from 'react-router-dom'
import router from './router/index'
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  return (
    <>
    <GoogleOAuthProvider clientId="917780056581-drc9i137r8lllt9kduia5n31nufpgdrl.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>;
    </>
  )
}

export default App
