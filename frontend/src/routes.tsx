import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Login } from './pages/Login'

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Login /> }
    ]
  }
])