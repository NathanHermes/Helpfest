import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Loading } from './pages/Loading'
import { Register } from './pages/Register'

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Loading /> },
      { path: '/login', element: <Login /> },
      { path: '/home', element: <Home /> },
      { path: '/register', element: <Register /> }
    ]
  }
])